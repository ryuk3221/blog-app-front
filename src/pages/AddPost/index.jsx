import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { isAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


export const AddPost = () => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputFileRef = React.useRef(null);
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditPage = id ? true : false;

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setImageUrl(res.data.imageUrl);
          setValue(res.data.text);
          setTags(res.data.tags.join(' '));
        });
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка загрузки файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const submitPost = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        text: value,
        imageUrl: imageUrl,
        tags: tags.split(' ')
      }



      if (id) {
        const { data } = await axios.patch(`/posts/${id}`, fields);
        navigate(`/posts/${data._id}`);
      } else {
        const { data } = await axios.post('/posts', fields);
        navigate(`/posts/${data._id}`);
      }

    } catch (err) {
      console.warn(err);
      alert('Не удалось добавить пост');
    }
  }

  const isLogin = useSelector(isAuth);

  if (!window.localStorage.getItem('token') && !isLogin) {
    return <Navigate to='/' />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      {isEditPage && (
        <h1 className={styles.h1}>Редактирование статьи</h1>
      )}
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={() => submitPost()}>
          {isEditPage ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button
            size="large"
          >
            Отмена
          </Button>
        </a>
      </div>
    </Paper>
  );
};

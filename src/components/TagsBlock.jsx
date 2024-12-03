import React from "react";
import { TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { Padding } from "@mui/icons-material";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <div style={{ padding: 16 }}>
        <TextField style={{ width: '100%' }} variant="standard" placeholder="Поиск" />
      </div>
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={`/tags/${name}`}
            key={i}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};

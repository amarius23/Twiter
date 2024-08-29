import { createContext } from "react";
import {Post} from "../types/Post";

export const PostContext = createContext<Post[]>([]);
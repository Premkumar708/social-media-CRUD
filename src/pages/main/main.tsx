import { getDocs, collection, } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface post {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;

}

export const Main = () => {
    const [ postLists, setPostLists ] = useState<post[] | null>(null);
    const postsRef = collection( db, "posts");

    const getPost = async () =>{
        const data = await getDocs(postsRef);
        setPostLists((data.docs.map((doc) => ({...doc.data(), id: doc.id}))) as post[]);
    }



    useEffect(() =>{
        getPost();
     }, []);

    return  <div>
        {postLists?.map((post) => 
    <Post post={post}/> 
    )}
    </div>

}
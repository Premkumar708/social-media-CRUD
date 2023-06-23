import { addDoc,getDocs,collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { post as Ipost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface props {
    post: Ipost;
}
interface like {
    likeId: string;
    userId: string;
}

export const Post = (props: props) =>{
    const [ user ] = useAuthState(auth);
    const [like, setLike] = useState<like[]| null>(null);
    const { post } = props;
    const likesRef = collection( db, "likes" );
    const likesDocs = query( likesRef, where("postId" ,"==" ,post.id));
    const getLike = async () => {
        const data = await getDocs(likesDocs);
        setLike(data.docs.map((doc) => ({userId:doc.data().userId, likeId: doc.id})));
    }

      const addLike = async () =>{
        try {
           const newDoc = await addDoc( likesRef, { userId:user?.uid , postId: post.id});
        if(user) {
            setLike ((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id}] : [{ userId: user.uid,likeId: newDoc.id}]
            );
        }
      }catch (err){
        console.log(err);
     }
 };
 const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLike(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

      const hasUserliked = like?.find((like) => like.userId == user?.uid);

      useEffect(()=>{
        getLike();
      }, )

    return <div>
        <div className="title"><h1>{post.title}</h1></div>
        <div className="description"><p>{post.description}</p></div>
        <div className="username">@{post.username}</div>
        <button onClick={ hasUserliked ? removeLike: addLike }>{ hasUserliked ? <>&#128078; </> : <>&#128077;</> }</button>
        {like && <p>likes: {like?.length}</p>}
        </div>
}

"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}
export default function Home() {
  const [todo, setTodo] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todo`);
        setTodo(res.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);
  return (
    <div>
      <h1>Todo List</h1>
      {todo.length > 0 ? (
        todo.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>작성일: {new Date(item.createdAt).toDateString()}</p>
            <p>수정일: {new Date(item.updatedAt).toDateString()}</p>
            <p>{item.isDone ? "완료" : "미완료"}</p>
          </div>
        ))
      ) : (
        <p>등록된 할 일이 없습니다.</p>
      )}
    </div>
  );
}

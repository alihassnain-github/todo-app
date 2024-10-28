"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormEvent, useEffect, useState } from "react";
import Todo from "@/components/todo";

type TodoType = {
  id: string
  task: string,
  completed: boolean,
  createdAt: Date
}

export default function Home() {

  const [todoTxt, setTodoTxt] = useState("")
  const [editTodoTxt, setEditTodoTxt] = useState("")
  const [editing, setEditing] = useState<null | string>(null)
  const [allTodos, setAllTodos] = useState<TodoType[]>(() => {
    const existingTodos = localStorage.getItem("todos")
    return existingTodos ? JSON.parse(existingTodos) : []
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editing) {
      const todo = {
        id: crypto.randomUUID(),
        task: todoTxt,
        completed: false,
        createdAt: new Date()
      }
      setAllTodos([...allTodos, todo])
      setTodoTxt("")
    }
    else {
      const newTodos = allTodos.map((todo) => (todo.id === editing ? { ...todo, task: editTodoTxt } : todo))
      setAllTodos(newTodos)
      setEditing(null)
      setEditTodoTxt("")
    }
  };

  useEffect(() => {
    const allTodosObj = JSON.stringify(allTodos)
    localStorage.setItem("todos", allTodosObj)
  }, [allTodos])

  const toggleCompleted = (id: string) => {
    const newTodos = allTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    setAllTodos(newTodos)
  }

  const deleteTodo = (id: string) => {
    const newTodos = allTodos.filter((todo) => (todo.id !== id))
    setAllTodos(newTodos)
  }

  const editTodo = (id: string, task: string) => {
    setEditing(id)
    setEditTodoTxt(task)
  }

  return (
    <main className="bg-slate-50 min-h-screen h-full w-full px-4">
      <h1 className="text-4xl font-semibold text-center my-4">Todo App</h1>
      <div className="md:w-1/2 w-full mx-auto my-8">
        <form onSubmit={handleSubmit}>
          <div className="flex w-full items-center space-x-2">
            <Input onChange={(e) => editing ? setEditTodoTxt(e.target.value) : setTodoTxt(e.target.value)} required value={editing ? editTodoTxt : todoTxt} type="text" placeholder="Enter the task" className="rounded" />
            <Button type="submit" className="rounded">{editing ? "Save todo" : "Add todo"}</Button>
          </div>
        </form>
      </div>
      <div className="md:w-1/2 w-full mx-auto my-10">
        {
          allTodos.length > 0 ? (
            allTodos.map((todo) => (
              <Todo key={todo.id} id={todo.id} completed={todo.completed} task={todo.task} createdAt={todo.createdAt} deleteTodo={deleteTodo} editTodo={editTodo} toggleCompleted={toggleCompleted} />
            ))
          ) : (
            <h1 className="text-xl text-center">No todo found.</h1>
          )
        }
      </div>
    </main>
  );
}

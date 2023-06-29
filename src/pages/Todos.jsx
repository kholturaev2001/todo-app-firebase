import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, Checkbox, Input, Skeleton, notification } from "antd";
import { doc, setDoc } from "firebase/firestore";
import EditModal from "./EditModal";

const Todos = () => {
  const userEmail = JSON.parse(sessionStorage.getItem("userInfo"))?.email;
  const [todosData, setTodosData] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInp, setEditInp] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  console.log("🚀 ~ file: Todos.jsx:25 ~ Todos ~ currentTodo:", currentTodo)


  function logoutFn() {
    sessionStorage.removeItem("userInfo");
    window.location.reload();
  }

  function getData() {
    setTodosLoading(true);
    try {
      const collectionRef = collection(db, "todos");
      const queryRef = query(collectionRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodosData(list);
        setTodosLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function addTodo() {
    if (inpValue.trim() !== "") {
      setInpValue("");
      try {
        const collectionRef = collection(db, "todos");
        await addDoc(collectionRef, {
          title: inpValue,
          status: false,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log("Error", error.message);
      }
    } else {
      notification["warning"]({
        message: "Warning!",
        description: "The field shouldn't be empty!",
      });
    }
  }

  async function deleteTodo(id) {
    setInpValue("");
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  async function editTodoFn() {
    if (editInp.trim() !== "") {
      setIsModalOpen(false);
      setEditInp("");
      try {
        const docRef = doc(db, "todos", currentTodo.id);
        await setDoc(docRef, {
          ...currentTodo,
          title: editInp,
        });
        notification["success"]({
          message: "Edited!",
          description: "The todo is successfully edited!",
        });
      } catch (error) {
        console.log("Error", error.message);
      }
    } else {
      notification["warning"]({
        message: "Warning!",
        description: "The field shouldn't be empty!",
      });
    }
  }

  async function checkedTodoFn(todo) {
    setIsModalOpen(false);
    setEditInp("");
    try {
      const docRef = doc(db, "todos", todo.id);
      await setDoc(docRef, {
        ...todo,
        status: !todo.status,
      });
      console.log(todo);
      notification["success"]({
        message: "Checked!",
        description: "The todo is successfully checked!",
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  }
  

  return (
    <div className="w-screen h-screen">
      <nav className="h-[45px] bg-[#4d4b48] flex items-center justify-between text-white font-bold text-[13px] px-4">
        <p>{userEmail}</p>
        <button onClick={logoutFn} className="px-4 py-2 bg-[blue] rounded-sm">
          Logout
        </button>
      </nav>
      <div className="w-[550px] mt-5 mx-auto">
        {todosLoading && (
          <div className="flex flex-col gap-5">
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
        {!todosLoading && (
          <div>
            <div>
              <p>Todos ({todosData.length})</p>
            </div>
            <div>
              <div className="flex my-5">
                <Input
                  className="border border-[gray]"
                  type="text"
                  placeholder="Enter todo here"
                  value={inpValue}
                  onChange={(e) => setInpValue(e.target.value)}
                />
                <Button
                  className="bg-blue-500 rounded-sm text-white"
                  onClick={addTodo}
                >
                  Submit
                </Button>
              </div>
              <div className="flex flex-col">
                {todosData?.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center bg-[wheat] justify-between p-4"
                  >
                    <div className="">
                      <Checkbox
                        type="checkbox"
                        checked={todo.status}
                        onChange={() => {
                          setCurrentTodo(todo);
                          checkedTodoFn(todo);
                        }}
                      />
                      <p>{todo.title}</p>
                    </div>
                    <div className="">
                      <Button
                        onClick={() => {
                          setIsModalOpen(true);
                          setEditInp(todo.title);
                          setCurrentTodo(todo);
                        }}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {
        <EditModal
          editInp={editInp}
          isModalOpen={isModalOpen}
          setEditInp={setEditInp}
          editTodoFn={editTodoFn}
          onCancel={() => setIsModalOpen(false)}
        />
      }
    </div>
  );
};

export default Todos;

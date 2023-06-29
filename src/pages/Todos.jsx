import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  Button,
  Checkbox,
  Input,
  Pagination,
  Skeleton,
  notification,
} from "antd";
import { doc, setDoc } from "firebase/firestore";
import EditModal from "./EditModal";
import Bin from "../icons/Bin";
import EditIcon from './../icons/EditIcon';

const Todos = () => {
  const userEmail = JSON.parse(sessionStorage.getItem("userInfo"))?.email;
  const [todosData, setTodosData] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInp, setEditInp] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const [current, setCurrent] = useState(1);

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
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  const pageSize = 5;

  const pagOnchange = (page) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedTodos = todosData?.slice(startIndex, endIndex);

  return (
    <div className="w-screen h-screen">
      <nav className="h-[45px] bg-[#4d4b48] flex items-center justify-between text-white font-bold text-[13px] px-4">
        <p>{userEmail}</p>
        <button onClick={logoutFn} className="px-4 py-2 bg-[blue] rounded-sm">
          Logout
        </button>
      </nav>
      <div className="max-w-[550px] border border-gray rounded-md mt-5 mx-auto">
        {todosLoading && (
          <div className="flex flex-col gap-5">
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
        {!todosLoading && (
          <div>
            <div className="bg-[#F7F7F7] p-4 font-bold">
              <p>Todos ({todosData.length})</p>
            </div>
            <div className='px-5'>
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
              <div className="flex flex-col  border border-gray min-h-[350px]">
                {displayedTodos?.map((todo, id) => (
                  <div
                    key={todo.id}
                    className={` ${
                      id % 2 === 0 ? "bg-[#F7F7F7]" : ""
                    } flex items-center justify-between p-4`}
                  >
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          setEditInp(todo.title);
                          setCurrentTodo(todo);
                        }}
                        className='bg-[#28A745] py-[5px] p-[10px] rounded-md'
                      >
                        <EditIcon />
                      </button>
                      <button className='bg-[#DC3545] py-[5px] p-[10px] rounded-md' onClick={() => deleteTodo(todo.id)}>
                        <Bin />
                      </button>
                    </div>
                  </div>
                ))}

              </div>
                <Pagination
                  current={current}
                  onChange={pagOnchange}
                  total={todosData.length}
                  pageSize={pageSize}
                  className="flex justify-center m-3"
                />
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

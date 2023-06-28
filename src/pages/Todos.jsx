const Todos = () => {
  function logoutFn() {
    sessionStorage.removeItem("userInfo");
    window.location.reload();
  }
  return (
    <div>
      <nav>
        <p>Admin</p>
        <button onClick={logoutFn}>Logout</button>
      </nav>
      <div>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Todos;

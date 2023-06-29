import { Input, Modal } from "antd";

const EditModal = ({
  editInp,
  setEditInp,
  editTodoFn,
  editId,
  onCancel,
  isModalOpen,
}) => {
  return (
    <Modal
      onOk={editTodoFn}
      onCancel={onCancel}
      open={isModalOpen}
    >
      <Input 
        value={editInp} 
        onChange={(e) => setEditInp(e.target.value)} 
        className="my-5 mt-8"
    />
    </Modal>
  );
};

export default EditModal;

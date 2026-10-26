import Modal from "../../../shared/components/Modal";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

const CommentModal = ({ isOpen, onClose, postId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Comments"}>
      <NewComment postId={postId} />
      <CommentsList postId={postId} />
    </Modal>
  );
};
export default CommentModal;

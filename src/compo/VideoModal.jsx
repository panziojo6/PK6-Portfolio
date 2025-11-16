import { Modal } from "antd";

export default function VideoModal({ open, onClose, src }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
    >
      <video
        src={src}
        controls
        autoPlay
        style={{ width: "100%", borderRadius: "10px" }}
      />
    </Modal>
  );
}

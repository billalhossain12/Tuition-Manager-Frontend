import { Modal, Button, Input, Radio } from "antd";
import { useState } from "react";

interface AttendanceNoteModalProps {
  open: boolean;
  onClose: () => void;
  routineId: string;
  studentId: string;
  studentName: string;
  isAttending: boolean;
  onSubmit: (data: {
    routineId: string;
    studentId: string;
    status: "present" | "absent";
    note: string;
  }) => void;
}

export default function AttendanceNoteModal({
  open,
  onClose,
  routineId,
  studentId,
  studentName,
  isAttending,
  onSubmit,
}: AttendanceNoteModalProps) {
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onSubmit({
      routineId,
      studentId,
      status,
      note,
    });

    setNote("");
    setStatus("present");
    onClose();
  };

  return (
    <Modal
      title={`Mark Attendance - ${studentName}`}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="space-y-4">
        {/* Status */}
        <div>
          <p className="mb-2 font-medium">Status</p>

          <Radio.Group
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex items-center gap-1"
          >
            <Radio className="present-radio" value="present">
              Present
            </Radio>
            <Radio className="absent-radio" value="absent">
              Absent
            </Radio>
          </Radio.Group>
        </div>

        {/* Note */}
        <div>
          <p className="mb-2 font-medium">Note (Optional)</p>

          <Input.TextArea
            rows={3}
            placeholder="Add note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose}>Cancel</Button>

          <Button disabled={isAttending} type="primary" onClick={handleSubmit}>
            {isAttending ? "Processing..." : "Save Attendance"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

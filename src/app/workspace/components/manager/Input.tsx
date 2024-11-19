import { ChangeEvent, ChangeEventHandler, memo, MouseEventHandler, SyntheticEvent } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const Input = memo(({ onClick, onChange }: { onClick: MouseEventHandler; onChange: (val: ChangeEvent<HTMLInputElement>) => void }) => (
  <InputGroup data-bs-theme="dark">
    <InputGroup.Text id="inputGroup-sizing-lg">File Name</InputGroup.Text>
    <Form.Control aria-label="File Name" aria-describedby="file-name" onChange={onChange} />
    <Button variant="outline-secondary" onClick={onClick}>
      Create File
    </Button>
  </InputGroup>
));

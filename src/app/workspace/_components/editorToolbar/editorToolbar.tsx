import { Button } from "@/components/ui/button";

const EditorToolbar = ({ setMarkdownPreviewPanel }) => {
  return (
    <div className="flex flex-row-reverse">
      <Button variant="default" onClick={setMarkdownPreviewPanel}>
        Preview
      </Button>
    </div>
  );
};

export default EditorToolbar;

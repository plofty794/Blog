import { EditorProvider, EditorProviderProps } from "@tiptap/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./Menubar";

interface EditorProps {
  control: Control<{ body: string; title: string }, any>;
  name: "body" | "title";
}

interface EditorProviderCustomProps extends EditorProviderProps {
  name: "body" | "title";
  value: string;
}

const CustomEditorProvider: ({
  children,
  slotAfter,
  slotBefore,
  ...editorOptions
}: EditorProviderCustomProps) => React.JSX.Element | null = EditorProvider;

const extensions = [StarterKit];

function TipTapEditor({ control, name }: EditorProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${name.toLocaleUpperCase()} is required.` }}
        render={({
          field: { onChange, name, value },
          fieldState: { error },
        }) => (
          <>
            <CustomEditorProvider
              name={name}
              value={value}
              children={null}
              slotBefore={<MenuBar />}
              extensions={extensions}
              content={""}
              onUpdate={({ editor }) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange(editor.getJSON().content.flat()[0].content[0].text);
              }}
            ></CustomEditorProvider>
            {error && <h1 className="text-white">{error.message}</h1>}
          </>
        )}
      />
    </>
  );
}

export default TipTapEditor;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Grid } from "../../../shared";
import { Link, Stack, TextareaAutosize } from "@mui/material";
import remarkGfm from "remark-gfm";

const Markdown = () => {
  const [input, setInput] = useState<string>(
    "# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n"
  );
  
  return (
    <Stack>
      <Grid.Wrap>
        <Grid.Item xs={6}>
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput((e.target as HTMLTextAreaElement).value)}
            style={{ maxWidth: "500px", overflow: "hidden" }}
          />
        </Grid.Item>
        <Grid.Item xs={6}>
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {input}
          </ReactMarkdown>
        </Grid.Item>
      </Grid.Wrap>
      <Grid.Wrap>
        <Grid.Item xs={12}>
          <Link
            target="_blank"
            href="https://www.markdownguide.org/cheat-sheet/"
          >
            Go to the cheat-seat for more information
          </Link>
        </Grid.Item>
      </Grid.Wrap>
    </Stack>
  );
};

export default Markdown;

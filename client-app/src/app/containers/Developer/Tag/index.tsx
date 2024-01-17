import { Box, Stack } from '@mui/material';
import { Tag, Typo } from '../../../shared';

const TemplateTag = () => {
  return (
    <Box>
      <Box className="mb-32">
        <Typo>Tag</Typo>
        <Stack direction={'row'} gap={3}>
          <Tag>Primary</Tag>
          <Tag variant="is-success">Success</Tag>
          <Tag variant="is-danger">Danger</Tag>
          <Tag variant="is-dark">Dark</Tag>
          <Tag variant="is-info">Info</Tag>
          <Tag variant="is-light">Light</Tag>
          <Tag variant="is-black">Black</Tag>
          <Tag variant="is-warning">Warning</Tag>
          <Tag variant="is-customize" backgroundColor="blue" color="red">
            Customize
          </Tag>
        </Stack>
      </Box>

      <Box className="mb-32">
        <h2>Tag isLight</h2>
        <Stack direction={'row'} gap={3}>
          <Tag isLight>Primary</Tag>
          <Tag isLight variant="is-success">
            Success
          </Tag>
          <Tag isLight variant="is-danger">
            Danger
          </Tag>
          <Tag isLight variant="is-dark">
            Dark
          </Tag>
          <Tag isLight variant="is-info">
            Info
          </Tag>
          <Tag isLight variant="is-light">
            Light
          </Tag>
          <Tag isLight variant="is-black">
            Black
          </Tag>
          <Tag isLight variant="is-warning">
            Warning
          </Tag>
        </Stack>
      </Box>
    </Box>
  );
};

export default TemplateTag;

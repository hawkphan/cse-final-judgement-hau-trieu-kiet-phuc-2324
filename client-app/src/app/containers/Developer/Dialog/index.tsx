



import { Box, Stack } from '@mui/material';
import { Button, Typo } from '../../../shared';

const TemplateDialog = () => {
  // const dispatch = useDispatch();

  // const showContentDialog = () => {
  //   dispatch(
  //     showDialog({
  //       type: '',
  //       data: {
  //         content: (
  //           <View>
  //             <MuiInput label="aaaaaaaaaa" placeholder="asdasd" />
  //             <MuiInput label="bbbbbbb" placeholder="cvbcvb" />

  //             <View justify="flex-end" isRow className="mt-16">
  //               <Button
  //                 variant="secondary-outline"
  //                 className="mr-16"
  //                 onClick={() => {
  //                   Toastify.success('Cancel Click');
  //                   dispatch(hideDialog());
  //                 }}
  //               >
  //                 Cancel
  //               </Button>
  //               <Button
  //                 onClick={() => {
  //                   Toastify.info('Ok Click');
  //                   dispatch(hideDialog());
  //                 }}
  //               >
  //                 Ok
  //               </Button>
  //             </View>
  //           </View>
  //         ),
  //         cancelText: 'Cancel',
  //         okText: 'Ok',
  //         onCancel: () => dispatch(hideDialog()),
  //       },
  //     }),
  //   );
  // };

  // const showYesNoDialog = () => {
  //   dispatch(
  //     showDialog({
  //       type: '',
  //       data: {
  //         title: 'Yes No Dialog',
  //         content: (
  //           <View>
  //             <MuiInput label="aaaaaaaaaa" placeholder="asdasd" />
  //             <MuiInput label="bbbbbbb" placeholder="cvbcvb" />
  //           </View>
  //         ),
  //         cancelText: 'Cancel',
  //         okText: 'Ok',
  //         onOk: () => {
  //           Toastify.info('Ok Click');
  //           dispatch(hideDialog());
  //         },
  //         onCancel: () => {
  //           Toastify.info('Cancel Click');
  //           dispatch(hideDialog());
  //         },
  //       },
  //     }),
  //   );
  // };

  // const showYesNoReconfirmDialog = () => {
  //   dispatch(
  //     showDialog({
  //       type: '',
  //       data: {
  //         title: 'Yes No Dialog',
  //         content: (
  //           <View>
  //             <MuiInput label="aaaaaaaaaa" placeholder="asdasd" />
  //             <MuiInput label="bbbbbbb" placeholder="cvbcvb" />
  //           </View>
  //         ),
  //         cancelText: 'Cancel',
  //         okText: 'Ok',
  //         onOk: () => {
  //           Toastify.info('Ok Click');
  //           dispatch(hideAllDialog());
  //         },
  //         onCancel: () => {
  //           Toastify.info('Cancel Click');
  //           dispatch(hideAllDialog());
  //         },
  //         reconfirm: {
  //           ok: {
  //             show: true,
  //             title: 'Ok Confirmation Title',
  //             content: 'Ok Content',
  //           },
  //           cancel: {
  //             show: true,
  //             title: 'Cancel Confirmation Title',
  //             content: 'Cancel Content',
  //           },
  //         },
  //       },
  //     }),
  //   );
  // };
  return (
    <Box mb={4}>
      <Typo>Dialog</Typo>
      <Stack direction={'row'} gap={2}>
        <Button onClick={() => {}}>Content Dialog</Button>
        <Button onClick={() => {}}>YES NO Dialog</Button>
        <Button onClick={() => {}}>YES NO + Reconfirm Answer Dialog</Button>
      </Stack>
    </Box>
  );
};

export default TemplateDialog;

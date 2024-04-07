/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "../../../../../../shared/common/stores/store";
import {
  EditProfileBody,
  useGetProfileById,
} from "../../../../../../queries/Profiles";
import { API_QUERIES } from "../../../../../../queries";
import {
  EditProfileFormSchema,
  ProfileProperties,
  mapFormData,
  toBreadCrumbs,
} from "../../helpers";
import {
  Breadcrumbs,
  Button,
  LoadingCommon,
  MuiDatePicker,
  MuiInput,
  MuiSelect,
  Toastify,
  isEmpty,
} from "../../../../../../shared";
import { PATHS } from "../../../../../../configs/paths";
import { useEditProfile } from "../../../../../../queries/Profiles/useEditProfile";
import dayjs from "dayjs";
import { IMAGES } from "../../../../../../configs/images";

export const EditProfileForm = () => {
  const { userStore } = useStore();
  const id = useMemo(() => {
    return userStore?.user?.id;
  }, [userStore.user]);
  const navigate = useNavigate();

  const [fileSelected, setFileSelected] = useState<File | undefined>();

  const { profile, isFetching, handleInvalidateProfile } = useGetProfileById({
    id,
    queryKey: [API_QUERIES.GET_PROFILE_BY_ID, { id: id }],
  });

  const { onEditProfile, isPending: isEditPending } = useEditProfile({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateProfile();
      navigate(PATHS.profile.replace(":id", id));
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const { control, handleSubmit, reset } = useForm<EditProfileBody>({
    defaultValues: { ...profile },

    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
    resolver: yupResolver<any>(EditProfileFormSchema),
  });

  useEffect(() => {
    reset({ ...profile });

    if (!isEmpty(profile.avatar)) {
      setAvatarSrc("data:image/jpeg;base64," + profile.avatar);
    }
  }, [profile, reset]);

  const onSubmit = async (data: EditProfileBody) => {
    const formData = mapFormData(data, fileSelected);
    onEditProfile(formData);
  };

  const [avatarSrc, setAvatarSrc] = useState(IMAGES.defaultUser);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChangeAndSave = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isEmpty(event.target.files)) {
      const file = event.target.files[0];
      setFileSelected(file);
      const filePreviewUrl = URL.createObjectURL(file);
      setAvatarSrc(filePreviewUrl);
    }
  };

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Breadcrumbs items={toBreadCrumbs(id)} />
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
              <Typography level="body-sm">
                Customize how your profile information will appear to the
                networks.
              </Typography>
            </Box>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
              {/* Avatar */}
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                >
                  <img src={avatarSrc} loading="lazy" alt="Avatar" />
                </AspectRatio>
                <input
                  accept="image/jpeg"
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChangeAndSave}
                />

                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  onClick={handleUploadClick}
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 100,
                    top: 170,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Controller
                      name={ProfileProperties.FIRST_NAME}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <MuiInput
                          label="First Name"
                          placeholder="First name"
                          value={value}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                    <Controller
                      name={ProfileProperties.LAST_NAME}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <MuiInput
                          label="Last Name"
                          placeholder="Last name"
                          value={value}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                    <Controller
                      name={ProfileProperties.DISPLAY_NAME}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <MuiInput
                          label="Display Name"
                          placeholder="Display name"
                          value={value}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                      flexGrow: 1,
                    }}
                  >
                    <Controller
                      name={ProfileProperties.GENDER}
                      control={control}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <MuiSelect
                          size="small"
                          label="Gender"
                          options={[
                            { label: "Male", value: "0" },
                            { label: "Female", value: "1" },
                            { label: "Other", value: "2" },
                          ]}
                          value={value + ""}
                          onChange={(_, value) => {
                            onChange(value);
                          }}
                          required
                          errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                    <Controller
                      name={ProfileProperties.DATE_OF_BIRTH}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => {
                        return (
                          <MuiDatePicker
                            label="Date of Birth"
                            value={dayjs(value)}
                            onChange={(value) => onChange(value.toLocaleDateString())}
                            required
                            errorMessage={error?.message}
                            {...props}
                          />
                        );
                      }}
                    />
                  </FormControl>
                </Stack>

                {/*Hidden Form  */}
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <>
                          <Input
                            size="sm"
                            placeholder="email"
                            sx={{ flexGrow: 1, display: "none" }}
                            value={value}
                            onChange={(data) => {
                              onChange(data);
                            }}
                            required
                            {...props}
                          />
                          {error && (
                            <p style={{ color: "red" }}>{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>

            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button isLoading={isEditPending} type="submit">
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>
        </Form>
      </Stack>
    </Box>
  );
}

export default EditProfileForm;

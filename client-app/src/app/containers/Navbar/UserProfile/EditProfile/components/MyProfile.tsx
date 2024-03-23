import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Form } from "react-router-dom";
import { EditProfileBody } from "../../../../../queries/Profiles/types";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../../../../shared/common/stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PATHS } from "../../../../../configs/paths";
import { useEditProfile } from "../../../../../queries/Profiles/useEditProfile";
import { EditProfileFormSchema, mapFormData } from "../helpers";
import { useGetProfileById } from "../../../../../queries/Profiles";
import { API_QUERIES } from "../../../../../queries";
import { LoadingCommon, Toastify } from "../../../../../shared";
import { LoadingCommon, MuiDatePicker, Toastify } from "../../../../../shared";
import { EditProfileFormSchema, mapFormData } from "../helpers";
import { useEditProfile } from "../../../../../queries/Profiles/useEditProfile";
import dayjs from "dayjs";

export interface Profile {
  userName?: string;
  firstName?: string;
  laastName?: string;
  email?: string;
  birthday?: string;
  isFemale?: boolean;
  displayName?: string;
  code?: string;
}

export default function MyProfile() {
  const { userStore } = useStore();
  const id = useMemo(() => {
    return userStore?.user?.id;
  }, [userStore.user]);
  const navigate = useNavigate();
  // const id = useMemo(() => {
  //   return sessionStorage.getItem('myId');
  // }, [userStore.user]);

  // const id = sessionStorage.getItem('myId');
  // console.log("ID storage: " + id)

  // const isEdit = id && id !== "";
  const [fileSelected, setFileSelected] = useState<File | undefined>();

  const { data, isFetching, handleInvalidateProfile } = useGetProfileById({
    id,
    queryKey: [API_QUERIES.GET_PROFILE_BY_ID, { id: id }],
  });
  const profile: Profile = useMemo(() => {
    return data?.data;
  }, [id]);

  //React hook form
  const { onEditProfile, isPending: isEditPending } = useEditProfile({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateProfile();
      navigate(PATHS.profile);
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const { control, handleSubmit, reset, setError } = useForm<EditProfileBody>({
    defaultValues: { ...profile },

    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
    resolver: yupResolver<any>(EditProfileFormSchema),
  });

  useEffect(() => {
    reset({ ...profile });
  }, [profile, reset]);

  const onSubmit = async (data: EditProfileBody) => {
    alert("Submit successful");
    alert(
      // `Submit successful: \n${data.birthday}\n${data.email}\n${data.firstName}\n${data.lastName}\n${data.userName}`
    );

    const formData = mapFormData(data,fileSelected);

    onEditProfile(formData);
    // if (!fileSelected) {
    //   alert("!fileSelected");
    //   // Toastify.error(ValidationMessage.LACK_OF_FILE);
    //   return;
    // }
    onEditProfile(formData);
  };

  // Upload img avatar from client pc
  const [avatarSrc, setAvatarSrc] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Tạo URL từ file được chọn
      const newAvatarSrc = URL.createObjectURL(event.target.files[0]);
      // Cập nhật state với URL mới
      setAvatarSrc(newAvatarSrc);
    }
  };
  const handleFileChangeAndSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Cập nhật state với file được chọn
      setFileSelected( file); // Sửa ở đây
      // Tạo URL và cập nhật state để hiển thị trước hình ảnh
      const filePreviewUrl = URL.createObjectURL(file);
      setAvatarSrc(filePreviewUrl); // Và ở đây
    }
  };

  if (isFetching) {
    return <LoadingCommon />;
  }
  return (
    <Box sx={{ flex: 1, width: "100%" }}>
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
                Customize how your profile information will apper to the
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
                  accept="image/*"
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

              {/*Form  */}
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="sm"
                          placeholder="First name"
                          value={value}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          // errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="sm"
                          placeholder="Last name"
                          sx={{ flexGrow: 1 }}
                          value={value}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          // errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                    <Controller
                      name="userName"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="sm"
                          placeholder="User name"
                          sx={{ flexGrow: 1 }}
                          value={value}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          // errorMessage={error?.message}
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
                    <Divider />
                    <FormLabel>Gender</FormLabel>
                    <Controller
                      name="gender"
                      control={control}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 3,
                            gap: 20,
                          }}
                        >
                          <div>
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="female"
                              checked={value === 1}
                              onChange={onChange}
                              {...props}
                            />
                            <label htmlFor="female">Female</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="male"
                              checked={value === 0}
                              onChange={onChange}
                              {...props}
                            />
                            <label htmlFor="male">Male</label>
                          </div>
                          {/* <div>
                            <input
                              type="radio"
                              id="other"
                              name="gender"
                              value="other"
                              checked={value === "other"}
                              onChange={onChange}
                              {...props}
                            />
                            <label htmlFor="other">Other</label>
                          </div> */}
                          {error && <p>{error.message}</p>}
                        </div>
                      )}
                    />
                    <Divider />
                    <FormLabel>Date of Birth</FormLabel>
                    <Controller
                      name="birthday"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...props },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="sm"
                          type="date"
                          sx={{ flexGrow: 1 }}
                          onChange={(data) => {
                            onChange(data);
                          }}
                          required
                          // errorMessage={error?.message}
                          {...props}
                        />
                      )}
                    />
                      {/* }) => {
                        const formattedDate = value ? value.split("T")[0] : "";
                        console.log("dob " + formattedDate);
                        return (
                          <Input
                            size="sm"
                            type="date"
                            sx={{ flexGrow: 1 }}
                            value={formattedDate} 
                            onChange={(e) => {
                              const newDate = e.target.value
                                ? `${e.target.value}T00:00:00`
                                : "";
                              onChange(newDate);
                            }}
                            required
                            {...props}
                          />
                        );
                      }}
                    /> */}
                    
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
                <Button size="sm" variant="outlined" color="neutral">
                  Cancel
                </Button>
                <Button type="submit" size="sm" variant="solid">
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

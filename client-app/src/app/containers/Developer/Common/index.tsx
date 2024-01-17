/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FaElementor, FaUserShield, FaUsersCog } from "react-icons/fa";

import dayjs from "dayjs";
import "./styles.scss";
import {
  Badge,
  Banner,
  Button,
  Checkbox,
  ConfirmationCodeField,
  FileUpload,
  Loading,
  MuiDatePicker,
  MuiDateRangePicker,
  MuiInput,
  MuiInputCurrency,
  MuiInputMask,
  MuiInputPassword,
  MuiMultiSelect,
  MuiSelect,
  PhoneInput,
  RadioButton,
  Signature,
  TimePicker,
  UploadFileType,
  View,
  WeekPicker,
  isEmpty,
} from "../../../shared";
import { DateRange } from "../../../shared/components/common/DateRangePicker";

const Dev: React.FC<Props> = () => {
  const [files, setFiles] = useState<UploadFileType[]>([]);
  const [count, setCount] = useState(0);
  const [datePicked, setDatePicked] = useState<any>(null);
  const [dateRange, setDateRange] = useState<[Date, Date]>();
  const [newTime, setNewTime] = useState<Date>(new Date());
  const [week, setWeek] = useState<[Date, Date]>([new Date(), new Date()]);
  const [radio, setRadio] = useState<string>("");
  const [select, setSelect] = useState<string[]>([]);
  const [source, setSource] = useState<string>(null);
  const [currencyInput, setCurrencyInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [selectedControlledOptions, setSelectedControlledOptions] = useState<
    string[]
  >(["heap"]);

  const handleCodeFieldChange = (value: string) => {
    console.log("value", value);
  };

  const handleCheckboxChange = (_name: any, value: any[]) => {
    console.log("handleCheckboxChange", value);
    setSelect(value);
  };

  const handleDateRangePickerChange = (value: DateRange) => {
    console.log("handleDateRangePickerChange", value);
    setDateRange(value);
  };

  const handleTimePickerChage = (value: Date) => {
    console.log("handleTimePickerChange", value);
    setNewTime(value);
  };

  const handleWeekPickerChange = (value: any) => {
    console.log(value);
    setWeek(value);
  };

  return (
    <Container maxWidth="lg">
      <View className="mt-32">
        <h2>Mui Input Phone</h2>
        <PhoneInput
          onChange={(_name: string, value: string) => {
            setPhoneInput(value);
          }}
          label="Input Phone"
          value={phoneInput}
          name="inputPhone"
        />
      </View>
      <View className="mt-32">
        <h2>Mui Input Currency</h2>
        <MuiInputCurrency
          onChange={(event) => {
            setCurrencyInput(event.currentTarget.value);
          }}
          label="Currency"
          value={currencyInput}
          name=""
        />
      </View>

      <View className="mt-32">
        <h2 className="mb-16">Mui Input Mask</h2>
        <MuiInputMask
          onChange={(event) => {
            setInput(event.currentTarget.value);
          }}
          label="Mask"
          value={input}
          name=""
          mask="(#0000)-0000-0000"
          definitions={{
            "#": /[a-z]/,
          }}
        />
      </View>

      <View className="mb-32">
        <h2>Banner</h2>
        <Banner
          title="Tips"
          status="warning"
          className="mb-8"
          message="Et eu nostrud deserunt id anim mollit. Sint deserunt adipisicing aliqua ut tempor qui consectetur duis reprehenderit consectetur. Voluptate consectetur enim ut veniam enim dolor commodo ea ad ad aliqua nulla officia."
        />
        <Banner
          title="Tips"
          status="rejected"
          className="mb-8"
          message="Et eu nostrud deserunt id anim mollit. Sint deserunt adipisicing aliqua ut tempor qui consectetur duis reprehenderit consectetur. Voluptate consectetur enim ut veniam enim dolor commodo ea ad ad aliqua nulla officia."
        />
        <Banner
          title="Tips"
          status="completed"
          className="mb-8"
          message="Et eu nostrud deserunt id anim mollit. Sint deserunt adipisicing aliqua ut tempor qui consectetur duis reprehenderit consectetur. Voluptate consectetur enim ut veniam enim dolor commodo ea ad ad aliqua nulla officia."
        />
      </View>

      <View className="mb-32">
        <h2 className="">Deposition Badge</h2>
        <Badge variant="Active" className="mb-8" />
        <Badge variant="Completed" className="mb-8" />
        <Badge variant="Pending" className="mb-8" />
        <Badge variant="Rejected" className="mb-8" />
      </View>
      <View className="mb-32">
        <h2>Signature</h2>
        <Signature onChange={(name: string, value: any) => setSource(value)} />
        {source && <img src={source} alt="asdasd" />}
      </View>

      <View className="mb-32">
        <h2>Image</h2>
        <img src="https://picsum.photos/200" alt="picsum" width={200} />
      </View>

      <View className="mb-32">
        <h2>File Upload</h2>
        {/* {files?.map((file) => (
          <View key={file.name}>
            <Text>Name: {file.name}</Text>
            <Text>Size: {file.size} bytes</Text>
            <Text>Type: {file.type}</Text>
          </View>
        ))} */}
        {/* <FilePreview
          files={files}
          onRemoveAttachment={(id: string) => {
            Toastify.info(id);
          }}
        /> */}
        <FileUpload
          onChange={(value: UploadFileType[]) => setFiles([...files, ...value])}
          errorMessage={isEmpty(files) ? "Error go here" : ""}
        />
      </View>
      <View className="mb-32">
        <h2>Mui Date Picker</h2>
        <MuiDatePicker
          label="Mui Date Picker"
          maxDate={dayjs()}
          minDate={dayjs().subtract(3, "days")}
          required
          errorMessage="error go here"
        />
        <MuiDatePicker
          label="Mui Date Picker Value"
          value={datePicked}
          onChange={(value) => setDatePicked(value)}
        />
      </View>
      <View className="mb-32">
        <h2>Mui Date Range Picker</h2>
        <MuiDateRangePicker
          label="Mui Date Picker"
          required
          placeholder="MM/DD/YYYY - MM/DD/YYYY"
          value={dateRange}
          onChange={(_, value) => handleDateRangePickerChange(value)}
        />
        {/* <MuiDatePicker
          label="Mui Date Picker Value"
          value={datePicked}
          onChange={(value) => setDatePicked(value)}
        /> */}
      </View>

      <View className="mb-32">
        <h2>Date Range Picker</h2>
        <div className="columns">
          <div className="column">
            {/* <DateRangePicker
              selecteds={dateRange}
              label="date range 1"
              onChange={handleDateRangePickerChange}
            /> */}
          </div>

          <div className="column">
            {/* <DateRangePicker
              selecteds={dateRange}
              label="date range 1"
              onChange={handleDateRangePickerChange}
              disabled
            /> */}
          </div>
        </div>
      </View>

      <View className="mt-40">
        <div className="columns">
          <div className="column">
            <WeekPicker
              weekSelected={week}
              label="week picker 1"
              onChange={handleWeekPickerChange}
            />
          </div>
          <div className="column">
            <WeekPicker
              weekSelected={week}
              label="week picker 1"
              onChange={handleWeekPickerChange}
              errorMessage="error go here"
            />
          </div>
          <div className="column">
            <WeekPicker
              weekSelected={week}
              label="week picker 1"
              onChange={handleWeekPickerChange}
              disabled
            />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            {/* <DatePicker selected={datePicked} label=
            "date 1" onChange={handleDatePickerChage} /> */}
          </div>
          <div className="column">
            {/* <DatePicker
              label="date 2"
              onChange={handleDatePickerChage}
              errorMessage="error go here"
            /> */}
          </div>
          <div className="column">
            {/* <DatePicker
              selected={datePicked}
              label="date 3"
              onChange={handleDatePickerChage}
              disabled
            /> */}
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <TimePicker
              selected={newTime}
              label="time 1"
              onChange={handleTimePickerChage}
            />
          </div>
          <div className="column">
            {/* <DatePicker
              label="date 2"
              onChange={handleDatePickerChage}
              errorMessage="error go here"
            /> */}
          </div>
          <div className="column">
            {/* <DatePicker
              selected={datePicked}
              label="date 3"
              onChange={handleDatePickerChage}
              disabled
            /> */}
          </div>
        </div>
      </View>

      <View className="mb-32">
        <h2>Count</h2>
        <h1>{count}</h1>
        <Button onClick={() => setCount(count + 1)}>Count</Button>
      </View>

      <View>
        <View className="mt-40" isRow justify="space-around">
          <Button icon={<FaElementor />}>To Interview</Button>
          <Button icon={<FaUserShield />} iconPosition="right">
            Icon Right
          </Button>
          <Button icon={<FaUsersCog />} variant="outline">
            Icon Left
          </Button>
          <Button icon={<FaUsersCog />} iconPosition="right" variant="outline">
            Icon Right
          </Button>
          <Tooltip arrow title="Test Tool Tip top">
            <span>
              <Button>Tooltip</Button>
            </span>
          </Tooltip>
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Button variant="text">Text Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="outline">Outline Button</Button>
        </View>
      </View>

      <View className="mb-32">
        <h2>Loading</h2>
        <View
          isRow
          justify="space-around"
          style={{ backgroundColor: "black", padding: 20 }}
        >
          <Loading loadingStyle={1} />
          <Loading loadingStyle={2} />
          <Loading loadingStyle={3} />
          <Loading loadingStyle={4} />
          <Loading loadingStyle={5} />
        </View>
      </View>
      <View className="mb-32">
        <h2>Confirmation Code Field</h2>
        <ConfirmationCodeField onChange={handleCodeFieldChange} />
      </View>

      <View className="mb-32">
        <h2>Checkbox</h2>
        <Checkbox.Group
          label="Hello World Checkbox"
          options={[
            { label: "Hello", value: "Hello" },
            { label: "World", value: "World" },
            { label: "Loc", value: "Loc" },
            { label: "Tran", value: "Tran" },
          ]}
          onChange={handleCheckboxChange}
          value={select}
          columns={3}
        />
        <Checkbox.Group
          label="Hello World Checkbox"
          options={[
            { label: "Hello", value: "Hello" },
            { label: "World", value: "World" },
            { label: "Loc", value: "Loc" },
            { label: "Tran", value: "Tran" },
          ]}
          onChange={handleCheckboxChange}
          value={select}
          columns={3}
          disabled
        />
      </View>
      <View className="mb-32">
        <RadioButton
          label="Radio button"
          options={[
            { label: "Hello", value: "Hello" },
            { label: "World", value: "World" },
            { label: "Loc", value: "Loc" },
            { label: "Tran", value: "Tran" },
          ]}
          onChange={(name, value: string) => setRadio(value)}
          value={radio}
        />
        <p>Radio value: {radio}</p>
      </View>
      <View className="mb-32">
        <h2>Input</h2>
        <MuiInput label="Text" defaultValue="1" />
        <MuiInput label="Text Error" defaultValue="2" errorMessage="aaaaa" />
        <MuiInput label="Text Disabled" defaultValue="3" disabled />
        <MuiInput label="" type="text" focused />
        <MuiInputPassword label="Password with eye" />
      </View>

      <View className="mb-32">
        <h2>Accordion</h2>
      </View>
      {/* <View className="mb-32">
        <h2>Date Picker</h2>
        <DatePicker value={new Date().toISOString()} onChange={emptyFunction} />
        <hr />
      </View> */}

      <View className="mb-32">
        <h2>Multiple select (controlled)</h2>
        <MuiMultiSelect
          label="Multiple Select"
          options={[
            {
              label: "Adjacent - very near, next to, or touching",
              value: "adjacent",
            },
            { label: "Controlled", value: "controlled" },
            { label: "Uncontrolled", value: "uncontrolled" },
            { label: "Heap", value: "heap" },
            { label: "Stack", value: "stack" },
            { label: "Queue", value: "queue" },
          ]}
          value={selectedControlledOptions}
          onChange={(_name, value) => setSelectedControlledOptions(value)}
        />
        <h2>Multiple select with with checkbox and limit tags (controlled)</h2>
        <MuiMultiSelect
          showCheckbox
          disableCloseOnSelect
          limitTags={2}
          label="Multiple Select"
          options={[
            {
              label: "Adjacent - very near, next to, or touching",
              value: "adjacent",
            },
            { label: "Controlled", value: "controlled" },
            { label: "Uncontrolled", value: "uncontrolled" },
            { label: "Heap", value: "heap" },
            { label: "Stack", value: "stack" },
            { label: "Queue", value: "queue" },
          ]}
          value={selectedControlledOptions}
          onChange={(_e, value) => setSelectedControlledOptions(value)}
        />
        <h2>Multiple select with error (controlled)</h2>
        <MuiMultiSelect
          label="Multiple Select"
          options={[
            {
              label: "Adjacent - very near, next to, or touching",
              value: "adjacent",
            },
            { label: "Controlled", value: "controlled" },
            { label: "Uncontrolled", value: "uncontrolled" },
            { label: "Heap", value: "heap" },
            { label: "Stack", value: "stack" },
            { label: "Queue", value: "queue" },
          ]}
          value={selectedControlledOptions}
          onChange={(_e, value) => setSelectedControlledOptions(value)}
          errorMessage="Error Message"
        />
      </View>

      <View className="mb-32">
        <h2>Auto complete (uncontrolled)</h2>
        <MuiSelect
          label="auto"
          options={[
            { label: "Hello", value: "Hello" },
            { label: "World", value: "World" },
            { label: "Loc", value: "Loc" },
            { label: "Tran", value: "Tran" },
          ]}
        />
        <h2>Auto complete multiple (uncontrolled)</h2>
        <h2>Auto complete disable (uncontrolled)</h2>
        <MuiSelect
          label="auto"
          disabled
          options={[
            { label: "Hello", value: "Hello" },
            { label: "World", value: "World" },
            { label: "Loc", value: "Loc" },
            { label: "Tran", value: "Tran" },
          ]}
        />
        <h2>Auto complete error (uncontrolled)</h2>
        <MuiSelect
          label="auto"
          errorMessage="error"
          options={[
            { label: "Hello", value: "Hello" },
            { label: "World", value: "World" },
            { label: "Loc", value: "Loc" },
            { label: "Tran", value: "Tran" },
          ]}
        />
        <h2>Auto complete limit render (uncontrolled)</h2>
        {/* <MuiSelect
          label="auto"
          limitRender={2}
          multiple
          options={[
            { label: 'Hello', value: 'Hello' },
            { label: 'World', value: 'World' },
            { label: 'Loc', value: 'Loc' },
            { label: 'Tran', value: 'Tran' },
          ]}
        /> */}
      </View>
    </Container>
  );
};

type Props = {};

export default Dev;

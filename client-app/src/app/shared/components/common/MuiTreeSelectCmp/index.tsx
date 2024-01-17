// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // eslint-disable jsx-a11y/no-static-element-interactions
// // eslint-disable jsx-a11y/click-events-have-key-events
// import { TreeItem, TreeItemProps, TreeView, useTreeItem } from '@mui/lab';
// import { InputAdornment, Popover, TypographyProps } from '@mui/material';

// import React, { FC, ForwardedRef, PropsWithChildren, useEffect, useRef, useState } from 'react';
// import { MdArrowDropDown, MdArrowDropUp, MdExpandLess, MdExpandMore } from 'react-icons/md';
// import { MuiInput } from '../MuiInput';
// import Typo from '../Typo';
// import View from '../View';
// import './styles.scss';
// import { COLOR_CODE } from '../../..';

// const MuiTreeSelectCmp: FC<Props> = ({
//   options,
//   label,
//   onChange,
//   disabled = false,
//   placeholder,
//   value,
// }) => {
//   const ref = useRef(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const [equipmentItem, setEquipmentItem] = useState('');
//   const [equipmentId, setEquipmentId] = useState(value);

//   const findNameById = (targetId: string) => {
//     return options.flatMap((option) => option).find(({ value }) => value === targetId)?.label || '';
//   };

//   useEffect(() => {
//     setEquipmentItem(findNameById(value));
//   }, [options]);

//   const CustomContent = React.forwardRef(function CustomContent(
//     props: any,
//     ref: ForwardedRef<any>,
//   ) {
//     const { label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;

//     const { handleExpansion, handleSelection } = useTreeItem(nodeId);

//     const icon = iconProp || expansionIcon || displayIcon;

//     const handleExpansionClick = (event: React.SyntheticEvent<Element, Event>) => {
//       handleExpansion(event);
//     };

//     const handleSelectionClick = (event: React.SyntheticEvent<Element, Event>) => {
//       handleSelection(event);
//       handleClose();
//     };

//     return (
//       <View align="center" className="cmp-tree-select" isRow forwardRef={ref}>
//         <div role="presentation" onClick={handleExpansionClick}>
//           {icon}
//         </div>
//         <Typo className="pl-1" onClick={handleSelectionClick} fontSize={14}>
//           {label}
//         </Typo>
//       </View>
//     );
//   });

//   const CustomTreeItem = (props: JSX.IntrinsicAttributes & TreeItemProps) => (
//     <TreeItem ContentComponent={CustomContent} {...props} />
//   );

//   const handleClick = (event: { currentTarget: any }) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const renderTree = (nodes: {
//     value: React.Key;
//     label:
//       | string
//       | number
//       | boolean
//       | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//       | React.ReactFragment
//       | React.ReactPortal;
//     children: any[];
//   }) => (
//     <CustomTreeItem key={nodes.value} nodeId={nodes.value as string} label={nodes.label}>
//       {Array.isArray(nodes.children)
//         ? nodes.children.map((node) => {
//             return renderTree(node);
//           })
//         : null}
//     </CustomTreeItem>
//   );

//   return (
//     <>
//       <MuiInput
//         defaultValue={equipmentItem}
//         value={equipmentItem}
//         label={label}
//         onClick={handleClick}
//         disabled={disabled}
//         placeholder={placeholder}
//         ref={ref}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               {open ? <MdArrowDropUp size={24} /> : <MdArrowDropDown size={24} />}
//             </InputAdornment>
//           ),
//         }}
//       />
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//       >
//         <TreeView
//           aria-label="icon expansion"
//           defaultSelected={equipmentId}
//           defaultExpandIcon={<MdExpandLess color={COLOR_CODE.PRIMARY_400} size={20} />}
//           selected={equipmentId}
//           defaultCollapseIcon={<MdExpandMore color={COLOR_CODE.PRIMARY_400} size={20} />}
//           onNodeSelect={(e: any, id: string): void => {
//             setEquipmentId(id);
//             setEquipmentItem(e.target.innerText);
//             onChange(id);
//           }}
//           sx={{
//             width: ref?.current?.offsetWidth,
//             height: 200,
//             flexGrow: 1,
//             minWidth: '200px',
//             overflowY: 'auto',
//             '.MuiTreeItem-group': {
//               paddingLeft: 2,
//               margin: 0,
//             },
//             'MuiTreeItem-root': {
//               '&:hover': {
//                 backgroundColor: 'rgba(0, 0, 0, 0.04)',
//               },
//             },
//           }}
//         >
//           {options.map((item, i) => renderTree(item))}
//         </TreeView>
//       </Popover>
//     </>
//   );
// };

// type Props = PropsWithChildren &
//   TypographyProps & {
//     options: any[];
//     label: string;
//     onChange: (id: string) => void;
//     disabled?: boolean;
//     placeholder?: string;
//     value?: string;
//   };

// export default MuiTreeSelectCmp;

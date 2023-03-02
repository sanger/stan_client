"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[220],{"./src/components/labwareScanner/LabwareScanner.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LabwareScannerList:function(){return LabwareScannerList},LabwareScannerSlotsTableStory:function(){return LabwareScannerSlotsTableStory},LabwareScannerTable:function(){return LabwareScannerTable},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return LabwareScanner_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react=__webpack_require__("./node_modules/react/index.js"),LabwareScanner=__webpack_require__("./src/components/labwareScanner/LabwareScanner.tsx"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),motion=__webpack_require__("./node_modules/framer-motion/dist/es/render/dom/motion.mjs"),MutedText=__webpack_require__("./src/components/MutedText.tsx"),LockIcon=__webpack_require__("./src/components/icons/LockIcon.tsx"),react_table=__webpack_require__("./node_modules/react-table/index.js"),Table=__webpack_require__("./src/components/Table.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),DataTableComponent=function DataTableComponent(_ref,ref){var columns=_ref.columns,data=_ref.data,defaultSort=_ref.defaultSort,_ref$sortable=_ref.sortable,sortable=void 0!==_ref$sortable&&_ref$sortable,memoedColumns=react.useMemo((function(){return columns}),[columns]),memoedData=react.useMemo((function(){return data}),[data]),plugins=[],initialState={};sortable&&(plugins.push(react_table.useSortBy),defaultSort&&(initialState.sortBy=defaultSort));var instance=react_table.useTable.apply(void 0,[{columns:memoedColumns,data:memoedData,initialState:initialState}].concat(plugins)),getTableProps=instance.getTableProps,getTableBodyProps=instance.getTableBodyProps,headerGroups=instance.headerGroups,rows=instance.rows,prepareRow=instance.prepareRow;return instance.download=function(){return rows.map((function(row){return prepareRow(row),row.cells.map((function(cell){return cell.value instanceof Date?cell.value.toLocaleDateString():cell.value}))}))},(0,react.useImperativeHandle)(ref,(function(){return instance.download()})),(0,jsx_runtime.jsxs)(Table.ZP,(0,objectSpread2.Z)((0,objectSpread2.Z)({},getTableProps()),{},{children:[(0,jsx_runtime.jsx)(Table.ss,{children:headerGroups.map((function(headerGroup){return(0,jsx_runtime.jsx)("tr",(0,objectSpread2.Z)((0,objectSpread2.Z)({},headerGroup.getHeaderGroupProps()),{},{children:headerGroup.headers.map((function(column){return(0,jsx_runtime.jsxs)(Table.xD,(0,objectSpread2.Z)((0,objectSpread2.Z)({},column.getHeaderProps(sortable?column.getSortByToggleProps():void 0)),{},{children:[column.render("Header"),column.isSorted?column.isSortedDesc?(0,jsx_runtime.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"inline-block h-4 w-4",children:(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})}):(0,jsx_runtime.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"inline-block h-4 w-4",children:(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",clipRule:"evenodd"})}):""]}))}))}))}))}),(0,jsx_runtime.jsx)(Table.RM,(0,objectSpread2.Z)((0,objectSpread2.Z)({},getTableBodyProps()),{},{children:rows.map((function(row){return prepareRow(row),(0,jsx_runtime.jsx)(motion.E.tr,(0,objectSpread2.Z)((0,objectSpread2.Z)({initial:{x:-20,opacity:0},animate:{x:0,opacity:1}},row.getRowProps()),{},{children:row.cells.map((function(cell){return(0,jsx_runtime.jsx)(Table.pj,(0,objectSpread2.Z)((0,objectSpread2.Z)({},cell.getCellProps()),{},{children:cell.render("Cell")}))}))}))}))}))]}))},components_DataTable=react.forwardRef(DataTableComponent),RemoveButton=__webpack_require__("./src/components/buttons/RemoveButton.tsx"),LabwareScanPanel=function LabwareScanPanel(_ref){var columns=_ref.columns,onRemove=_ref.onRemove,_useLabwareContext=(0,LabwareScanner.v)(),labwares=_useLabwareContext.labwares,removeLabware=_useLabwareContext.removeLabware,locked=_useLabwareContext.locked,data=react.useMemo((function(){return labwares}),[labwares]),actionsColumn=react.useMemo((function(){return{Header:"",id:"actions",Cell:function Cell(_ref2){var row=_ref2.row;return locked?(0,jsx_runtime.jsx)(LockIcon.Z,{className:"block m-2 h-5 w-5 text-gray-800"}):(0,jsx_runtime.jsx)(RemoveButton.Z,{type:"button",onClick:function onClick(){row.original.barcode&&(removeLabware(row.original.barcode),null==onRemove||onRemove(row.original))}})}}}),[locked,removeLabware,onRemove]),allColumns=[].concat((0,toConsumableArray.Z)(columns),[actionsColumn]);return(0,jsx_runtime.jsxs)("div",{children:[0===labwares.length&&(0,jsx_runtime.jsx)(MutedText.Z,{children:"Scan a piece of labware to get started"}),labwares.length>0&&(0,jsx_runtime.jsx)(motion.E.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},className:"mt-3",children:(0,jsx_runtime.jsx)(components_DataTable,{columns:allColumns,data:data})})]})},labwareScanPanel_LabwareScanPanel=LabwareScanPanel;try{LabwareScanPanel.displayName="LabwareScanPanel",LabwareScanPanel.__docgenInfo={description:"",displayName:"LabwareScanPanel",props:{columns:{defaultValue:null,description:"The list of columns to display in the table",name:"columns",required:!0,type:{name:"Column<LabwareFieldsFragment>[]"}},onRemove:{defaultValue:null,description:"",name:"onRemove",required:!1,type:{name:"((labware: LabwareFieldsFragment) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/labwareScanPanel/LabwareScanPanel.tsx#LabwareScanPanel"]={docgenInfo:LabwareScanPanel.__docgenInfo,name:"LabwareScanPanel",path:"src/components/labwareScanPanel/LabwareScanPanel.tsx#LabwareScanPanel"})}catch(__react_docgen_typescript_loader_error){}var Circle=function Circle(_ref){var backgroundColor=_ref.backgroundColor;return(0,jsx_runtime.jsx)("span",{className:"inline-block h-8 w-8 rounded-full bg-".concat(backgroundColor,"-600")})},components_Circle=Circle;try{Circle.displayName="Circle",Circle.__docgenInfo={description:"",displayName:"Circle",props:{backgroundColor:{defaultValue:null,description:"",name:"backgroundColor",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Circle.tsx#Circle"]={docgenInfo:Circle.__docgenInfo,name:"Circle",path:"src/components/Circle.tsx#Circle"})}catch(__react_docgen_typescript_loader_error){}var slotHelper=__webpack_require__("./src/lib/helpers/slotHelper.ts");function valueFromSamples(labwareOrSlot,sampleFunction){return function joinUnique(array){return Array.from(new Set(array)).join(", ")}(("labwareType"in labwareOrSlot?labwareOrSlot.slots.flatMap((function(slot){return slot.samples})):labwareOrSlot.samples).map(sampleFunction))}var columns={color:function color(meta){return{id:"color",Header:"",accessor:function accessor(originalRow){var _meta$get,_originalRow$slots$,_originalRow$slots$$s;return null!==(_meta$get=null==meta?void 0:meta.get(null===(_originalRow$slots$=originalRow.slots[0])||void 0===_originalRow$slots$||null===(_originalRow$slots$$s=_originalRow$slots$.samples[0])||void 0===_originalRow$slots$$s?void 0:_originalRow$slots$$s.id))&&void 0!==_meta$get?_meta$get:"#FFF"},Cell:function Cell(props){return(0,jsx_runtime.jsx)(components_Circle,{backgroundColor:props.value})}}},barcode:function barcode(){return{Header:"Barcode",accessor:"barcode"}},donorId:function donorId(){return{Header:"Donor ID",accessor:function accessor(labware){return valueFromSamples(labware,(function(sample){return sample.tissue.donor.donorName}))}}},tissueType:function tissueType(){return{Header:"Tissue type",accessor:function accessor(labware){return valueFromSamples(labware,(function(sample){return sample.tissue.spatialLocation.tissueType.name}))}}},spatialLocation:function spatialLocation(){return{Header:"Spatial location",accessor:function accessor(labware){return valueFromSamples(labware,(function(sample){return String(sample.tissue.spatialLocation.code)}))}}},replicate:function replicate(){return{Header:"Replicate",accessor:function accessor(labware){return valueFromSamples(labware,(function(sample){var _sample$tissue$replic;return String(null!==(_sample$tissue$replic=sample.tissue.replicate)&&void 0!==_sample$tissue$replic?_sample$tissue$replic:"")}))}}},labwareType:function labwareType(){return{Header:"Labware Type",accessor:function accessor(labware){return labware.labwareType.name}}},externalName:function externalName(){return{Header:"External ID",accessor:function accessor(labware){return valueFromSamples(labware,(function(sample){var _sample$tissue$extern;return null!==(_sample$tissue$extern=sample.tissue.externalName)&&void 0!==_sample$tissue$extern?_sample$tissue$extern:""}))}}},bioState:function bioState(){return{Header:"Bio state",accessor:function accessor(labware){return valueFromSamples(labware,(function(sample){return sample.bioState.name}))}}},highestSectionForSlot:function highestSectionForSlot(slotAddress){return{Header:"Highest Section for Block",accessor:function accessor(labware){var _maybeFindSlotByAddre,_maybeFindSlotByAddre2;return null!==(_maybeFindSlotByAddre=null===(_maybeFindSlotByAddre2=(0,slotHelper.ax)(labware.slots,slotAddress))||void 0===_maybeFindSlotByAddre2?void 0:_maybeFindSlotByAddre2.blockHighestSection)&&void 0!==_maybeFindSlotByAddre?_maybeFindSlotByAddre:"-"}}},medium:function medium(){return{Header:"Medium",accessor:function accessor(labware){return labware.slots[0].samples.length>0?labware.slots[0].samples[0].tissue.medium.name:""}}},fixative:function fixative(){return{Header:"Fixative",accessor:function accessor(labware){return labware.slots[0].samples.length>0?labware.slots[0].samples[0].tissue.fixative.name:""}}}},labwareColumns=columns;function LabwareScannerSlotsTable(){var _useLabwareContext=(0,LabwareScanner.v)(),labwares=_useLabwareContext.labwares,removeLabware=_useLabwareContext.removeLabware,locked=_useLabwareContext.locked;return(0,jsx_runtime.jsx)("div",{children:labwares.length>0&&(0,jsx_runtime.jsx)(motion.E.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},className:"mt-3",children:(0,jsx_runtime.jsxs)(Table.ZP,{children:[(0,jsx_runtime.jsx)(Table.ss,{children:(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)(Table.xD,{children:"Address"}),(0,jsx_runtime.jsx)(Table.xD,{children:"Tissue Type"}),(0,jsx_runtime.jsx)(Table.xD,{children:"Spatial Location"}),(0,jsx_runtime.jsx)(Table.xD,{})]})}),(0,jsx_runtime.jsx)(Table.RM,{children:labwares.flatMap((function(lw){return lw.slots.map((function(slot,i){return(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)(Table.pj,{children:slot.address}),(0,jsx_runtime.jsx)(Table.pj,{children:valueFromSamples(slot,(function(sample){return sample.tissue.spatialLocation.tissueType.name}))}),(0,jsx_runtime.jsx)(Table.pj,{children:valueFromSamples(slot,(function(sample){return String(sample.tissue.spatialLocation.code)}))}),0===i&&(0,jsx_runtime.jsx)(Table.pj,{rowSpan:lw.labwareType.numRows*lw.labwareType.numColumns,children:locked?(0,jsx_runtime.jsx)(LockIcon.Z,{className:"block m-2 h-5 w-5 text-gray-800"}):(0,jsx_runtime.jsx)(RemoveButton.Z,{type:"button",onClick:function onClick(){return removeLabware(lw.barcode)}})})]},lw.barcode+slot.address)}))}))})]})})})}try{LabwareScannerSlotsTable.displayName="LabwareScannerSlotsTable",LabwareScannerSlotsTable.__docgenInfo={description:"Table that shows all slots in a Labware. Can only be used within a {@link LabwareScanner }.\nUnfortunately doesn't use ReactTable as that doesn't support a way to use {@code rowSpan}s, which we need here.",displayName:"LabwareScannerSlotsTable",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/labwareScanner/LabwareScannerSlotsTable.tsx#LabwareScannerSlotsTable"]={docgenInfo:LabwareScannerSlotsTable.__docgenInfo,name:"LabwareScannerSlotsTable",path:"src/components/labwareScanner/LabwareScannerSlotsTable.tsx#LabwareScannerSlotsTable"})}catch(__react_docgen_typescript_loader_error){}var LabwareScanner_stories={title:"LabwareScanner",component:LabwareScanner.Z},LabwareScannerList=function LabwareScannerList(args){return(0,jsx_runtime.jsx)(LabwareScanner.Z,(0,objectSpread2.Z)((0,objectSpread2.Z)({},args),{},{children:(0,jsx_runtime.jsx)(List,{})}))},List=function List(){var _useLabwareContext=(0,LabwareScanner.v)(),labwares=_useLabwareContext.labwares,removeLabware=_useLabwareContext.removeLabware;return(0,jsx_runtime.jsx)("ul",{children:labwares.map((function(lw){return(0,jsx_runtime.jsxs)("li",{children:[lw.barcode," ",(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return removeLabware(lw.barcode)},className:"text-red-500 font-bold underline",children:"Remove"})]})}))})},LabwareScannerTable=function LabwareScannerTable(args){return(0,jsx_runtime.jsx)(LabwareScanner.Z,(0,objectSpread2.Z)((0,objectSpread2.Z)({},args),{},{children:(0,jsx_runtime.jsx)(labwareScanPanel_LabwareScanPanel,{columns:[labwareColumns.barcode(),labwareColumns.externalName(),labwareColumns.labwareType()]})}))},LabwareScannerSlotsTableStory=function LabwareScannerSlotsTableStory(args){return(0,jsx_runtime.jsx)(LabwareScanner.Z,(0,objectSpread2.Z)((0,objectSpread2.Z)({},args),{},{children:(0,jsx_runtime.jsx)(LabwareScannerSlotsTable,{})}))};LabwareScannerList.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => {\n  return (\n    <LabwareScanner {...args}>\n      <List />\n    </LabwareScanner>\n  );\n}"}},LabwareScannerList.parameters),LabwareScannerTable.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => {\n  return (\n    <LabwareScanner {...args}>\n      <LabwareScanPanel columns={[columns.barcode(), columns.externalName(), columns.labwareType()]} />\n    </LabwareScanner>\n  );\n}"}},LabwareScannerTable.parameters),LabwareScannerSlotsTableStory.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => {\n  return (\n    <LabwareScanner {...args}>\n      <LabwareScannerSlotsTable />\n    </LabwareScanner>\n  );\n}"}},LabwareScannerSlotsTableStory.parameters);var __namedExportsOrder=["LabwareScannerList","LabwareScannerTable","LabwareScannerSlotsTableStory"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/labwareScanner/LabwareScanner.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"src/components/labwareScanner/LabwareScanner.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}}}]);
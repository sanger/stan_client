"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[623],{"./src/components/forms/CustomReactSelect.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:function(){return Primary},__namedExportsOrder:function(){return __namedExportsOrder}});var _home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js"),_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),formik__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/formik/dist/formik.esm.js")),_CustomReactSelect__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/forms/CustomReactSelect.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"Forms/Formik/CustomReactSelect",component:_CustomReactSelect__WEBPACK_IMPORTED_MODULE_2__.Z};var Primary=function Primary(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(formik__WEBPACK_IMPORTED_MODULE_1__.J9,{onSubmit:function(){var _ref=(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_5__.Z)().mark((function _callee(values){return(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_5__.Z)().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.abrupt("return",alert(JSON.stringify(values)));case 1:case"end":return _context.stop()}}),_callee)})));return function(_x){return _ref.apply(this,arguments)}}(),initialValues:{workTypes:["Work type 2","Work type 1"]},children:function children(_ref2){var values=_ref2.values;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(formik__WEBPACK_IMPORTED_MODULE_1__.l0,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_CustomReactSelect__WEBPACK_IMPORTED_MODULE_2__.Z,{name:"workTypes",options:[{label:"Work type 1",value:"workType1"},{label:"Work type 2",value:"workType2"},{label:"Work type 3",value:"workType3"},{label:"Work type 4",value:"workType4"}],value:values.workTypes,isMulti:!0})})}})};Primary.parameters=(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({storySource:{source:"() => {\n  return (\n    <Formik\n      onSubmit={async (values: any) => alert(JSON.stringify(values))}\n      initialValues={{\n        workTypes: ['Work type 2', 'Work type 1']\n      }}\n    >\n      {({ values }) => (\n        <Form>\n          <CustomReactSelect\n            name=\"workTypes\"\n            options={[\n              { label: 'Work type 1', value: 'workType1' },\n              { label: 'Work type 2', value: 'workType2' },\n              { label: 'Work type 3', value: 'workType3' },\n              { label: 'Work type 4', value: 'workType4' }\n            ]}\n            value={values.workTypes}\n            isMulti={true}\n          />\n        </Form>\n      )}\n    </Formik>\n  );\n}"}},Primary.parameters);var __namedExportsOrder=["Primary"]},"./src/components/Modal.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{fe:function(){return ModalBody},mz:function(){return ModalFooter},xB:function(){return ModalHeader}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),Modal=function Modal(_ref){var children=_ref.children;return _ref.show?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"fixed z-20 inset-0 overflow-y-auto",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block xl:p-0",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"fixed inset-0 transition-opacity","aria-hidden":"true",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"​"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-md sm:w-full",role:"dialog","aria-modal":"true","aria-labelledby":"modal-headline",children:children})]})}):null};__webpack_exports__.ZP=Modal;var ModalHeader=function ModalHeader(_ref2){var children=_ref2.children;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{className:"border-b-2 border-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-gray-100 text-lg leading-6 font-medium text-gray-900",id:"modal-headline",children:children})},ModalBody=function ModalBody(_ref3){var children=_ref3.children;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4",children:children})},ModalFooter=function ModalFooter(_ref4){var children=_ref4.children;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",children:children})};try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{show:{defaultValue:null,description:"",name:"show",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}try{ModalHeader.displayName="ModalHeader",ModalHeader.__docgenInfo={description:"",displayName:"ModalHeader",props:{show:{defaultValue:null,description:"",name:"show",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Modal.tsx#ModalHeader"]={docgenInfo:ModalHeader.__docgenInfo,name:"ModalHeader",path:"src/components/Modal.tsx#ModalHeader"})}catch(__react_docgen_typescript_loader_error){}try{ModalBody.displayName="ModalBody",ModalBody.__docgenInfo={description:"",displayName:"ModalBody",props:{show:{defaultValue:null,description:"",name:"show",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Modal.tsx#ModalBody"]={docgenInfo:ModalBody.__docgenInfo,name:"ModalBody",path:"src/components/Modal.tsx#ModalBody"})}catch(__react_docgen_typescript_loader_error){}try{ModalFooter.displayName="ModalFooter",ModalFooter.__docgenInfo={description:"",displayName:"ModalFooter",props:{show:{defaultValue:null,description:"",name:"show",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Modal.tsx#ModalFooter"]={docgenInfo:ModalFooter.__docgenInfo,name:"ModalFooter",path:"src/components/Modal.tsx#ModalFooter"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Pill.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),Pill=function Pill(_ref){var color=_ref.color,children=_ref.children,className=_ref.className,spanClassName=classnames__WEBPACK_IMPORTED_MODULE_1___default()({"bg-sp text-gray-100":"pink"===color,"bg-sdb-300 text-gray-100":"blue"===color},"px-2 rounded-full font-semibold text-sm",className);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{className:spanClassName,children:children})};__webpack_exports__.Z=Pill;try{Pill.displayName="Pill",Pill.__docgenInfo={description:"",displayName:"Pill",props:{color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"enum",value:[{value:'"pink"'},{value:'"blue"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Pill.tsx#Pill"]={docgenInfo:Pill.__docgenInfo,name:"Pill",path:"src/components/Pill.tsx#Pill"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/forms/CustomReactSelect.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Label__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/forms/Label.tsx"),formik__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/formik/dist/formik.esm.js"),_index__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/forms/index.tsx"),react_select__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/react-select/dist/index-a86253bb.esm.js"),react_select__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react-select/dist/react-select.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["label","name","className","emptyOption","options","value","placeholder","handleChange","handleBlur","dataTestId","isMulti","fixedWidth"],_excluded2=["label","name","className","emptyOption","isMulti","options","value","dataTestId","placeholder","handleChange","handleBlur","valueAsNumber","fixedWidth"],_excluded3=["label","name","className","emptyOption","options","value","dataTestId","isMulti","fixedWidth"],defaultValue=function defaultValue(options,value,isMulti){return void 0===value?isMulti?[]:void 0:isMulti&&Array.isArray(value)?options?options.filter((function(option){return value.some((function(val){return val===option.label||val===option.value}))})):[]:options.find((function(option){return option.label===value||option.value===value}))},hasValueType=function hasValueType(obj){return null!=obj&&(Array.isArray(obj)||"object"==typeof obj&&"value"in obj)},NormalReactSelect=function NormalReactSelect(_ref){var label=_ref.label,name=_ref.name,className=_ref.className,_ref$emptyOption=_ref.emptyOption,emptyOption=void 0!==_ref$emptyOption&&_ref$emptyOption,options=_ref.options,value=_ref.value,placeholder=_ref.placeholder,handleChange=_ref.handleChange,handleBlur=_ref.handleBlur,dataTestId=_ref.dataTestId,_ref$isMulti=_ref.isMulti,isMulti=void 0!==_ref$isMulti&&_ref$isMulti,_ref$fixedWidth=_ref.fixedWidth,fixedWidth=void 0!==_ref$fixedWidth&&_ref$fixedWidth,props=(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_ref,_excluded),onChangeValue=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(value){hasValueType(value)&&(null==handleChange||handleChange(value))}),[handleChange]),_onBlur=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(value){hasValueType(value)&&(null==handleBlur||handleBlur(value))}),[handleBlur]),memoOptions=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return emptyOption?[{value:"",label:""}].concat((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__.Z)(options)):(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__.Z)(options)}),[emptyOption,options]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{"data-testid":null!=dataTestId?dataTestId:"select-div",className:"md:w-full ".concat(className),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Label__WEBPACK_IMPORTED_MODULE_1__.Z,{name:null!=label?label:"",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_select__WEBPACK_IMPORTED_MODULE_9__.ZP,(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({styles:{control:function control(baseStyles,state){return(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({},baseStyles),{},{borderColor:"1px solid ".concat("#7980B9"),boxShadow:state.isFocused?"0px 0px 2px ".concat("#7980B9"):"none","&:hover":{border:"1px solid ".concat("#7980B9"),boxShadow:"0px 0px 6px ".concat("#7980B9")},"input:focus":{boxShadow:"none"},width:fixedWidth?"30px":"max-content",minWidth:"100%"})},menu:function menu(base){return(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({},base),{},{width:"max-content",minWidth:"100%"})},option:function option(styles,_ref2){var isDisabled=_ref2.isDisabled,label=_ref2.label;return(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({},styles),{},{backgroundColor:isDisabled?"gray":"#626167",color:"white",cursor:isDisabled?"not-allowed":"default","&:hover":{backgroundColor:isDisabled?"gray":"#4792E4"},height:0===label.length?"35px":styles.height,padding:"2px 2px 8px 8px"})}},menuPosition:"fixed",name:name,onChange:function onChange(val){return onChangeValue(val)},onBlur:function onBlur(val){return _onBlur(val)},options:memoOptions,value:defaultValue(memoOptions,value,isMulti),isMulti:isMulti,placeholder:null!=placeholder?placeholder:"",components:{Option:function Option(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_select__WEBPACK_IMPORTED_MODULE_7__.c.Option,(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({},props),{},{className:"space-x-2",children:[props.isSelected&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input",{type:"checkbox",checked:props.isSelected,onChange:function onChange(){return null}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label",{className:"".concat(props.isSelected?"mr-2":"ml-6 mr-2"),children:props.label})]}))})},IndicatorSeparator:function IndicatorSeparator(){return null}}},props))})})},FormikReactSelect=function FormikReactSelect(_ref3){var _useFormikContext,label=_ref3.label,name=_ref3.name,className=_ref3.className,emptyOption=_ref3.emptyOption,isMulti=_ref3.isMulti,options=_ref3.options,value=_ref3.value,dataTestId=_ref3.dataTestId,placeholder=_ref3.placeholder,handleChange=_ref3.handleChange,handleBlur=_ref3.handleBlur,valueAsNumber=_ref3.valueAsNumber,fixedWidth=_ref3.fixedWidth,props=(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_ref3,_excluded2),_ref4=null!==(_useFormikContext=(0,formik__WEBPACK_IMPORTED_MODULE_2__.u6)())&&void 0!==_useFormikContext?_useFormikContext:{},setFieldValue=_ref4.setFieldValue,setFieldTouched=_ref4.setFieldTouched,onChangeValue=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(value){if(hasValueType(value)&&value){var val=Array.isArray(value)?value.map((function(val){return valueAsNumber?Number(val.value):val.value})):valueAsNumber?Number(value.value):value.value;name&&(null==setFieldValue||setFieldValue(name,val)),null==handleChange||handleChange(value)}}),[setFieldValue,name,handleChange,valueAsNumber]),onBlur=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(){name&&setFieldTouched(name),null==handleBlur||handleBlur()}),[setFieldTouched,name,handleBlur]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"".concat("block w-full rounded-md focus:outline-0  disabled:opacity-75 disabled:bg-gray-200 disabled:cursor-not-allowed"," ").concat(className),"data-testid":"form_select-div",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(NormalReactSelect,(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({name:name,label:label,onChange:function onChange(val){return onChangeValue(val)},options:options,onBlur:onBlur,emptyOption:emptyOption,dataTestId:dataTestId,placeholder:placeholder,isMulti:isMulti,value:value,fixedWidth:fixedWidth},props)),name&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.VN,{name:name})]})},CustomReactSelect=function CustomReactSelect(_ref5){var label=_ref5.label,name=_ref5.name,className=_ref5.className,emptyOption=_ref5.emptyOption,options=_ref5.options,value=_ref5.value,dataTestId=_ref5.dataTestId,isMulti=_ref5.isMulti,fixedWidth=_ref5.fixedWidth,props=(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_ref5,_excluded3);return name?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(FormikReactSelect,(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({name:name,label:label,className:className,options:options,value:value,emptyOption:emptyOption,isMulti:isMulti,dataTestId:dataTestId,fixedWidth:fixedWidth},props)):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(NormalReactSelect,(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({label:label,className:className,options:options,value:value,emptyOption:emptyOption,dataTestId:dataTestId,isMulti:isMulti,fixedWidth:fixedWidth},props))};__webpack_exports__.Z=CustomReactSelect;try{NormalReactSelect.displayName="NormalReactSelect",NormalReactSelect.__docgenInfo={description:"",displayName:"NormalReactSelect",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"Name of the HTML Input (optional - without this, no input will be rendered)",name:"name",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"Sets a className attribute on the outer component",name:"className",required:!1,type:{name:"string"}},options:{defaultValue:null,description:"Array of options that populate the select menu",name:"options",required:!0,type:{name:"OptionType[]"}},emptyOption:{defaultValue:{value:"false"},description:"",name:"emptyOption",required:!1,type:{name:"boolean"}},handleChange:{defaultValue:null,description:"",name:"handleChange",required:!1,type:{name:"((value: OptionType | OptionType[]) => void)"}},handleBlur:{defaultValue:null,description:"",name:"handleBlur",required:!1,type:{name:"((value?: OptionType | OptionType[]) => void)"}},placeholder:{defaultValue:null,description:"Placeholder for the select value",name:"placeholder",required:!1,type:{name:"string"}},dataTestId:{defaultValue:null,description:"",name:"dataTestId",required:!1,type:{name:"string"}},isMulti:{defaultValue:{value:"false"},description:"Support multiple selected options",name:"isMulti",required:!1,type:{name:"boolean"}},valueAsNumber:{defaultValue:null,description:"",name:"valueAsNumber",required:!1,type:{name:"boolean"}},fixedWidth:{defaultValue:{value:"false"},description:"",name:"fixedWidth",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/forms/CustomReactSelect.tsx#NormalReactSelect"]={docgenInfo:NormalReactSelect.__docgenInfo,name:"NormalReactSelect",path:"src/components/forms/CustomReactSelect.tsx#NormalReactSelect"})}catch(__react_docgen_typescript_loader_error){}try{CustomReactSelect.displayName="CustomReactSelect",CustomReactSelect.__docgenInfo={description:"",displayName:"CustomReactSelect",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"Name of the HTML Input (optional - without this, no input will be rendered)",name:"name",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"Sets a className attribute on the outer component",name:"className",required:!1,type:{name:"string"}},options:{defaultValue:null,description:"Array of options that populate the select menu",name:"options",required:!0,type:{name:"OptionType[]"}},emptyOption:{defaultValue:{value:"false"},description:"",name:"emptyOption",required:!1,type:{name:"boolean"}},handleChange:{defaultValue:null,description:"",name:"handleChange",required:!1,type:{name:"((value: OptionType | OptionType[]) => void)"}},handleBlur:{defaultValue:null,description:"",name:"handleBlur",required:!1,type:{name:"((value?: OptionType | OptionType[]) => void)"}},placeholder:{defaultValue:null,description:"Placeholder for the select value",name:"placeholder",required:!1,type:{name:"string"}},dataTestId:{defaultValue:null,description:"",name:"dataTestId",required:!1,type:{name:"string"}},isMulti:{defaultValue:{value:"false"},description:"Support multiple selected options",name:"isMulti",required:!1,type:{name:"boolean"}},valueAsNumber:{defaultValue:null,description:"",name:"valueAsNumber",required:!1,type:{name:"boolean"}},fixedWidth:{defaultValue:{value:"false"},description:"",name:"fixedWidth",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/forms/CustomReactSelect.tsx#CustomReactSelect"]={docgenInfo:CustomReactSelect.__docgenInfo,name:"CustomReactSelect",path:"src/components/forms/CustomReactSelect.tsx#CustomReactSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/forms/Label.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return forms_Label}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),Pill=__webpack_require__("./src/components/Pill.tsx"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),InfoIcon=function InfoIcon(props){return(0,jsx_runtime.jsx)("svg",(0,objectSpread2.Z)((0,objectSpread2.Z)({xmlns:"http://www.w3.org/2000/svg",height:"26",width:"26",fill:"currentColor"},props),{},{"data-testid":"info-icon",children:(0,jsx_runtime.jsx)("path",{d:"M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"})}))},icons_InfoIcon=InfoIcon;try{InfoIcon.displayName="InfoIcon",InfoIcon.__docgenInfo={description:"Info SVG icon",displayName:"InfoIcon",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/InfoIcon.tsx#InfoIcon"]={docgenInfo:InfoIcon.__docgenInfo,name:"InfoIcon",path:"src/components/icons/InfoIcon.tsx#InfoIcon"})}catch(__react_docgen_typescript_loader_error){}var motionVariants={fadeIn:{visible:{opacity:1},hidden:{opacity:0}},fadeInWithLift:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}},fadeInParent:{visible:{opacity:1,transition:{when:"beforeChildren",staggerChildren:.1}},hidden:{opacity:0,transition:{when:"afterChildren"}}},menuVariants:{hidden:{height:0,transition:{when:"afterChildren",duration:.3}},visible:{height:"auto",opacity:1,transition:{when:"beforeChildren",duration:.2}}},menuItemVariants:{hidden:{opacity:0,transition:{duration:.1}},visible:{opacity:1,transition:{duration:.1}}}},motion=__webpack_require__("./node_modules/framer-motion/dist/es/render/dom/motion.mjs"),FailIcon=__webpack_require__("./src/components/icons/FailIcon.tsx"),Modal=__webpack_require__("./src/components/Modal.tsx"),Information=function Information(_ref){var title=_ref.title,children=_ref.children,className=_ref.className,infoClassName=classnames_default()("relative justify-center align-middle items-center space-x-2",className),_React$useState=react.useState(!1),_React$useState2=(0,slicedToArray.Z)(_React$useState,2),hover=_React$useState2[0],setHover=_React$useState2[1];return(0,jsx_runtime.jsxs)("div",{"data-testid":"info-div",className:infoClassName,onMouseOver:function onMouseOver(){return setHover(!0)},onMouseLeave:function onMouseLeave(){return setHover(!1)},children:[(0,jsx_runtime.jsx)(icons_InfoIcon,{className:"bg-white inline-block ".concat(hover?"text-pink-600":"text-pink-400")}),hover&&(0,jsx_runtime.jsx)(motion.E.div,{variants:motionVariants.fadeInWithLift,initial:"hidden",animate:"visible",className:"relative",children:(0,jsx_runtime.jsxs)(Modal.ZP,{show:hover,children:[(0,jsx_runtime.jsxs)(Modal.xB,{children:[(0,jsx_runtime.jsx)("div",{className:"flex flex-row items-end justify-end",children:(0,jsx_runtime.jsx)(FailIcon.Z,{onClick:function onClick(){return setHover(!1)},className:"w-5 h-5 cursor-pointer hover:text-red-500 text-red-400\n                    }"})}),title&&(0,jsx_runtime.jsx)("div",{children:title})]}),(0,jsx_runtime.jsx)(Modal.fe,{children:(0,jsx_runtime.jsx)("div",{className:"flex flex-col p-1 space-y-2",onMouseLeave:function onMouseLeave(){return setHover(!1)},children:children})})]})})]})},notifications_Information=Information;try{Information.displayName="Information",Information.__docgenInfo={description:"",displayName:"Information",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/notifications/Information.tsx#Information"]={docgenInfo:Information.__docgenInfo,name:"Information",path:"src/components/notifications/Information.tsx#Information"})}catch(__react_docgen_typescript_loader_error){}var _excluded=["name","displayTag","info","children","className"],Label=function Label(_ref){var name=_ref.name,displayTag=_ref.displayTag,info=_ref.info,children=_ref.children,className=_ref.className,rest=(0,objectWithoutProperties.Z)(_ref,_excluded),labelClassName=classnames_default()("block",className);return(0,jsx_runtime.jsxs)("label",(0,objectSpread2.Z)((0,objectSpread2.Z)({},rest),{},{className:labelClassName,children:[(0,jsx_runtime.jsxs)("span",{className:"text-gray-800 mr-3 flex flex-row gap-x-1",children:[name,info&&(0,jsx_runtime.jsx)(notifications_Information,{title:name,children:info})]}),displayTag&&(0,jsx_runtime.jsx)(Pill.Z,{color:"pink",children:displayTag}),children]}))},forms_Label=Label;try{Label.displayName="Label",Label.__docgenInfo={description:"",displayName:"Label",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},displayTag:{defaultValue:null,description:"",name:"displayTag",required:!1,type:{name:"string"}},info:{defaultValue:null,description:"",name:"info",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/forms/Label.tsx#Label"]={docgenInfo:Label.__docgenInfo,name:"Label",path:"src/components/forms/Label.tsx#Label"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/forms/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Rg:function(){return formikName},VN:function(){return FormikErrorMessage}});__webpack_require__("./node_modules/react/index.js");var formik__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/formik/dist/formik.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/types/stan.ts"),__webpack_require__("./node_modules/react/jsx-runtime.js")),FormikErrorMessage=function FormikErrorMessage(_ref){var name=_ref.name,_useFormikContext=(0,formik__WEBPACK_IMPORTED_MODULE_1__.u6)(),errors=_useFormikContext.errors,touched=_useFormikContext.touched,error=(0,formik__WEBPACK_IMPORTED_MODULE_1__.u9)(errors,name);return(0,formik__WEBPACK_IMPORTED_MODULE_1__.u9)(touched,name)&&error?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(ErrorMessage,{children:error}):null},ErrorMessage=function ErrorMessage(_ref2){var children=_ref2.children;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{className:"text-red-500 text-xs italic",children:children})};function optionValues(entities,label,value,keyAsValue){var sortProps=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{sort:!0,sortType:"Ascending",alphaFirst:!1,excludeWords:["None"]};if(!entities||0===entities.length)return _jsx("option",{});var mapEntities=sortProps.sort?_toConsumableArray(entities).sort((function(a,b){var _sortProps$sortType,_sortProps$excludeWor,sortType=null!==(_sortProps$sortType=sortProps.sortType)&&void 0!==_sortProps$sortType?_sortProps$sortType:"Ascending",aVal="Ascending"===sortType?a[label]:b[label],bVal="Ascending"===sortType?b[label]:a[label];return null!==(_sortProps$excludeWor=sortProps.excludeWords)&&void 0!==_sortProps$excludeWor&&_sortProps$excludeWor.includes(String(aVal))||"None"===String(bVal)?0:alphaNumericSortDefault(String(aVal).toUpperCase(),String(bVal).toUpperCase(),sortProps.alphaFirst)})):entities;return mapEntities.map((function(e,index){return _jsx("option",{value:e[value],children:e[label]},keyAsValue?e[value]:index)}))}function formikName(prefix,name){return""===prefix?name:[prefix,name].join(".")}try{optionValues.displayName="optionValues",optionValues.__docgenInfo={description:"Utility for generating a list of <code><option></code> tags",displayName:"optionValues",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/forms/index.tsx#optionValues"]={docgenInfo:optionValues.__docgenInfo,name:"optionValues",path:"src/components/forms/index.tsx#optionValues"})}catch(__react_docgen_typescript_loader_error){}try{FormikErrorMessage.displayName="FormikErrorMessage",FormikErrorMessage.__docgenInfo={description:"Will display an error message if <code>name</code> has been touched and has an error",displayName:"FormikErrorMessage",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/forms/index.tsx#FormikErrorMessage"]={docgenInfo:FormikErrorMessage.__docgenInfo,name:"FormikErrorMessage",path:"src/components/forms/index.tsx#FormikErrorMessage"})}catch(__react_docgen_typescript_loader_error){}try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"Styled paragraph for an error message on a form input",displayName:"ErrorMessage",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/forms/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/forms/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/icons/FailIcon.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return FailIcon}});var _home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js"));function FailIcon(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg",(0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)((0,_home_runner_work_stan_client_stan_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)({xmlns:"http://www.w3.org/2000/svg","data-testid":"failIcon",viewBox:"0 0 20 20",fill:"currentColor"},props),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}))}try{FailIcon.displayName="FailIcon",FailIcon.__docgenInfo={description:"",displayName:"FailIcon",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/FailIcon.tsx#FailIcon"]={docgenInfo:FailIcon.__docgenInfo,name:"FailIcon",path:"src/components/icons/FailIcon.tsx#FailIcon"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":function(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}__webpack_require__.d(__webpack_exports__,{Z:function(){return _asyncToGenerator}})}}]);
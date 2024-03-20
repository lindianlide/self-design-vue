import CTableMain from "./CTableMain.vue";
import CField from "./CField.vue";
import CTable from "./CTable.vue";
import CToolbar from "./CToolbar.vue";
import CColumnSelect from "./CColumnSelect.vue";

import { pluginKey } from "./utils/key";
import {
  usePagination,
  useRequest,
  clearCache,
  setGlobalOptions,
  useLoadMore,
  useRequestProvider,
} from "./utils/request";

export {
  CField,
  CTable,
  CTableMain,
  CToolbar,
  CColumnSelect,
  usePagination,
  useRequest,
  clearCache,
  setGlobalOptions,
  useLoadMore,
  useRequestProvider,
  pluginKey,
};


const components =  [CField, CTable, CTableMain]



export default {
  install: (app) => {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}

import {get} from '@/utils/request'
import 'url-search-params-polyfill'

export function getEmployeeInfo(empname) {
  var params = new URLSearchParams();
  params.append('name',empname);
  return get('/erp/employee/query',{'name':empname});
}

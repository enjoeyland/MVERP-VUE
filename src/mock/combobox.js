export default {
    year(ctx) {
        return {
            status: true,
            'results|10':[{
                'key|+1': 1,
                'value|+1': 2010,
            }]
        };
    },

    season(ctx) {
        return {
            status: true,
            'results|4':[{
                'key|+1': 1,
                'value|+1': 1,
            }]
        };
    },

    getEasyUIComboboxData(ctx) {
        const {comboboxName, year, contractName, contractID, departmentName} = ctx.queries;

        if (comboboxName === 'ContractDataComboboxService') {
            let isSeasonComboBox = year && year.trim() && contractName && contractName.trim();
            let isCustomerComboBox = year && year.trim();
            let isYearComboBox = !year || !year.trim();
            if (isSeasonComboBox) {
                return {
                    status: true,
                    'results|4': [{
                        'key|+1': 1,
                        'value': [year, 'season', '@increment'].join('-'),
                    }]
                };
            }
            if (isCustomerComboBox) {
                return {
                    status: true,
                    'results|12': [{
                        'key|+1': 1,
                        'value': [year, 'customer', '@increment'].join('-'),
                    }]
                };
            }

            if (isYearComboBox) {
                return {
                    status: true,
                    'results|10': [{
                        'key|+1': 1,
                        'value|+1': 2010,
                    }]
                };
            }

        } else if (comboboxName === 'CustomerAddressDepartmentNameComboboxService') {
            return {
                status: true,
                'results|17': [{
                    'key|+1': 1,
                    'value': [contractID, 'Department', '@increment'].join('-'),
                }]
            };
        } else if (comboboxName === 'CustomerAddressTeamNameComboboxService') {
            return {
                status: true,
                'results|13': [{
                    'key|+1': 1,
                    'value': [contractID, departmentName, 'team', '@increment'].join('-')
                }]
            };
        } else if (comboboxName === 'CurrentInventoryManagementPage_CurrentInventoryDataGrid_Toolbar_Combobox_ItemName') {
            return {
                status: true,
                'results|13': [{
                    'key|+1': 1,
                    'value': [contractID, 'item', '@increment'].join('-'),
                }]
            };
        } else {
            return {
                status: false,
                errMsg: 'Illegal comboBox name: ' + comboboxName
            };
        }
    }
};
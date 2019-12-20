import currentInventory from './currentInventory'
import notification from './notification'
import contract from './contract'
import combobox from './combobox'

import mock from './wrapper';

export default function () {
    console.log('[mock] init.');
    mock.get(/\/api\/GetEasyUIComboboxData(\?.*)?/, combobox.getEasyUIComboboxData);
    mock.get(/\/api\/combobox\/year(\?.*)?/, combobox.year);
    mock.get(/\/api\/combobox\/season(\?.*)?/, combobox.season);
    mock.get(/\/api\/currentInventory\/list(\?.*)?/, currentInventory.list);
    mock.get(/\/api\/notification\/list(\?.*)?/, notification.list);
    mock.get(/\/api\/contract\/list(\?.*)?/, contract.list);
    mock.post(/\/api\/contract\/add(\?.*)?/, contract.add);
    mock.post(/\/api\/contract\/edit(\?.*)?/, contract.edit);
    mock.post(/\/api\/contract\/delete(\?.*)?/, contract.delete);
};

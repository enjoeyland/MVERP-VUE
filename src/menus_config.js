import NotificationManagement from './components/content/NotificationManagement';
import AdminManagement from './components/content/AdminManagement';
import ContractManagement from './components/content/ContractManagement';
import OrderManagement from './components/content/OrderManagement';
import ProductionRequestManagement from './components/content/ProductionRequestManagement';
import CurrentInventoryManagement from './components/content/CurrentInventoryManagement';
import AlteringManagement from './components/content/AlteringManagement';
import AsManagement from './components/content/AsManagement';
import AsSearch from './components/content/AsSearch';
import CustomerQualityManagement from './components/content/CustomerQualityManagement';
import UnitPriceManagement from './components/content/UnitPriceManagement';
import StockOutInInformationManagement from './components/content/StockOutInInformationManagement';
import RawMaterialPriceManagement from './components/content/RawMaterialPriceManagement';
import LaborCostManagement from './components/content/LaborCostManagement';
import DesignOfficeShoppingCostManagement from './components/content/DesignOfficeShoppingCostManagement';
import EtcCostManagement from './components/content/EtcCostManagement';
import AccountingInformationSearch from './components/content/AccountingInformationSearch';
import AssistanceRequestReport from './components/content/AssistanceRequestReport';
import InvoiceReport from './components/content/InvoiceReport';
import PackageLabelReport from './components/content/PackageLabelReport';

export default [
    {
        name: '정보관리',
        children: [
            { name: '개인정보', path: "/notificationManagement", component: NotificationManagement },
            { name: '직원관리', path: "/adminManagement", component: AdminManagement },
            { name: '거래처 정보 관리', path: "/contractManagement", component: ContractManagement }
        ]
    },/*
    {
        name: '생산 관리',
        children: [
            { name: '발주정보 관리', path: "/orderManagement", component: OrderManagement },
            { name: '생산 의뢰정보 관리', path: "/productionRequestManagement", component: ProductionRequestManagement }
        ]
    },*/
    {
        name: '재고 및 수선 관리',
        children: [
            { name: '재고현황 관리', path: "/currentInventoryManagement", component: CurrentInventoryManagement  },
            { name: '선장 관리', path: "/alteringManagement", component: AlteringManagement  }
        ]
    },
    {
        name: 'A/S',
        children: [
            { name: 'A/S정보 관리', path: "/asManagement", component: AsManagement  },
            { name: 'A/S현황 조회', path: "/asSearch", component: AsSearch  },
            { name: '고객 질의 관리', path: "/customerQualityManagement", component: CustomerQualityManagement  }
        ]
    },
    {
        name: '영업자재물류관리',
        children: [
            { name: '납품단가 관리', path: "/unitPriceManagement", component: UnitPriceManagement  },
			{ name: '청고내역관리', path: "/stockOutInInformationManagement", component: StockOutInInformationManagement  },
            { name: '입고내역관리', path: "/stockOutInInformationManagement", component: StockOutInInformationManagement  },
			{ name: '출고내역관리', path: "/stockOutInInformationManagement", component: StockOutInInformationManagement  },
            { name: '원부자제발주내역관리', path: "/rawMaterialPriceManagement", component: RawMaterialPriceManagement  },
            { name: '임가공비발주내역관리', path: "/laborCostManagement", component: LaborCostManagement  },
            { name: '디자인실구매내역관리', path: "/designOfficeShoppingCostManagement", component: DesignOfficeShoppingCostManagement  },
            { name: '기타부대비용내역관리', path: "/etcCostManagement", component: EtcCostManagement  },
            { name: '손익현황 조회', path: "/accountingInformationSearch", component: AccountingInformationSearch  }
        ]
    },
    {
        name: '각종 보고서',
        children: [
            { name: '업무협조', path: "/assistanceRequestReport", component: AssistanceRequestReport  },
            { name: '인수증', path: "/invoiceReport", component: InvoiceReport  },
            { name: '포장라벨', path: "/packageLabelReport", component: PackageLabelReport  },
			{ name: '업무보고서',path: "/packageLabelReport", component: PackageLabelReport },
        ]
    },
]

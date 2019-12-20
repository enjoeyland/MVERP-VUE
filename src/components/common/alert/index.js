import Alert from './Alert.vue';

const AlertBox = {};
AlertBox.install = function (Vue, options) {

    console.log('install alert')

    const AlertInstance = Vue.extend(Alert);

    let current = null;
    const init = () => {
        current = new AlertInstance();
        let el = current.$mount().$el;
        document.body.appendChild(el);
    };

    Vue.prototype.$alert = {
        success(description) {
            if (!current) {
                init();
            }
            current.alert('success', description);
        },
        info(description) {
            if (!current) {
                init();
            }
            current.alert('info', description);
        },
        warning(description) {
            if (!current) {
                init();
            }
            current.alert('warning', description);
        },
        error(description) {
            if (!current) {
                init();
            }
            current.alert('error', description);
        },
    };
};

export default AlertBox;
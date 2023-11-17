declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

// Или еще такой вариант
// declare module "*.module.css";
// declare module "*.module.scss";
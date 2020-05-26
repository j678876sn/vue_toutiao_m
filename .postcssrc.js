// PostCSS配置文件



module.exports = {
    // 配置需要使用的PostCSS插件
    plugins: {
        //配置使用autoprefixer插件
        // 作用：生成浏览器css样式规则前缀(处理兼容性的)
        // 但由于，VueCLI内部已经配置了autoprefixer,所以又配置了一次，在启动项目时才会报错，再次将其先注释
        /* autoprefixer: {
            browsers: ['Android >= 4.0', 'iOS >= 8'],
        }, */

        // 配置使用postcss-pxtorem插件
        'postcss-pxtorem': {
            // 问题：设计图每次切图需要将宽度除以22
            // vant设置的是37.5,因为vant是基于375px宽来写的
            // rootValue右两种表现方式
            // 1.数字，2.函数
            // 问题解决
            // 采用函数方法可以解决此问题
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // rootValue: 37.5,
            // 配置要转换的属性
            propList: ['*'],
            exclude: 'github-markdown'
        },
    },
};
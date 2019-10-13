'use strict';

const { join } = require('path');

const outs = exports;

// KOA HTTP应用所侦听的TCP端口号
outs.TCP_PORT = 8000;

// KOA HTTP请求超时时间
outs.KOA_TIMEOUT = 1000 * 60 * 90;

// KOA应用程序需要安装的中间件
outs.MIDDLE_WARES = [
    './middlewares/ware-static',
    './middlewares/ware-router'
];

// KOA HTTP服务静态资源目录
outs.ROOT_DIRECTORY = join(__dirname, '../client');

// 服务器端路由在此注册
outs.ROUTES = [
    '../routes/get-csv',
    '../routes/get-learn'
];

// ORACLE数据库url
outs.ORACLE_URL = '192.168.100.120:1521';

// ORACLE数据库的服务名
outs.ORACLE_DB = 'orcl';

// ORACLE数据库用户名
outs.ORACLE_ROOT = 'system';

// ORACLE数据库密码
outs.ORACLE_PWD = 'aqa';

// 执行hqms查询需要读取的主要sql文件
outs.HQMS_MAIN_PATHS = [
    './sql/hqms-checked.sql',
    './sql/hqms-uncheck.sql'
];

// hqms查询支持的指令
outs.HQMS_COMMANDS = {
    date: ['./sql/hqms-date.sql', function() {
        const init = new Date(0).toLocaleString(),
            two = [].slice.call(arguments, 0, 2).map(cur => {
                const ymd = cur.match(/^[^\d]*(\d{4})[^\d]*(\d{2})[^\d]*(\d{2})/);
                return ymd ? `${ymd[1]}-${ymd[2]}-${ymd[3]} 00:00:00` : init;
            });
        return [...two, ...Array(2 - two.length).fill(init)];
    }],
    hids: ['./sql/hqms-hid.sql', function() {
        return [`^(${[].slice.call(arguments).join('|')})$`];
    }]
};

// hqms字段映射规则
outs.HQMS_FIELD_RULES = [
    ['记录日期', val => new Date(val).toLocaleString()], 
    ['编目日期', val => new Date(val).toLocaleString()], 
    ['出院日期', val => new Date(val).toLocaleString()]
];


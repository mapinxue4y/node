let puppeteer =require('puppeteer');
const nodeSchedule = require('node-schedule');

//定时器每天9点
function nodeScheduleRule(){
	var rule = new nodeSchedule.RecurrenceRule();
	rule.minute =38 ;//设置时间
	nodeSchedule.scheduleJob(rule,test);
}

async function test(){
	
	let options={
		headless:false,//有无头模式，false是在浏览器中可视
		defaultViewport:{
			width:1000,
			height:800
		},
		slowMo:250
	}
	
	let browser=await puppeteer.launch(options)
	let page=await browser.newPage();
	
	await page.goto('https://s.bjfu.edu.cn/tp_fp/view?m=fp#from=hall&serveID=99f0cf19-3ca4-4786-badb-521f0f734cad&act=fp/serveapply');
	
	//登录标记缓存
	let un = await page.$('input[id="un"]');
	un.focus();
	await page.keyboard.type('111111111');//账号
	let pd = await page.$('input[id="pd"]');
	pd.focus();
	await page.keyboard.type('000000000');//密码
	let log = await page.$('.login_box_landing_btn');
	log.click();
	
	//报平安页面
	//await page.waitForNavigation();
	let pageSec = await browser.newPage();
	await pageSec.goto('https://s.bjfu.edu.cn/tp_fp/view?m=fp#from=hall&serveID=99f0cf19-3ca4-4786-badb-521f0f734cad&act=fp/serveapply',{waitUntil:'networkidle0'});
	let commit = await pageSec.$('#commit');
	commit.click();
/* 
页面分析
返回，用于测试
<button class="btn btn-default  pull-right btn-block" type="button" onclick="if(navigator.userAgent.indexOf('Firefox')>-1){window.history.go(-2);}else{window.history.go(-1)}">返回</button>
pd 密码框
<input type="password" class="login_box_input password-pic pic-input" id="pd" placeholder="密码">
un 账号框
<input type="text" class="login_box_input user-pic pic-input" id="un" placeholder="账号" style="margin-top:13px">
登录按钮
<input type="button" class="login_box_landing_btn">
报平安按钮
<button class="btn btn-primary  pull-left btn-block" type="button" id="commit" disabled="disabled">提交</button>
没啥用
<div uname="svs" class="box" style="cursor:pointer;" serveid="99f0cf19-3ca4-4786-badb-521f0f734cad" collect_id="" formid="7394b770-ba93-4041-91b7-80198a68" procid="bae380db-7db4-4c7c-9458-d79188fa359a" name="北林师生报平安（学生）">
					</div>
					*/
}
nodeScheduleRule();
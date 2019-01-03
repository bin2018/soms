<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="需求名称">
					<el-input v-model="filters.name" placeholder="需求"></el-input>
				</el-form-item>
				<el-form-item label="需求技能">
					<el-select v-model="filters.skill" placeholder="请选择技能">
						<el-option  v-for="item in skills" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getDemands">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="demands" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage,getDemandSkillList, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
                    name: '',
                    skill:''
				},
				demands: [],
				skills:[],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getDemands();
			},
			//获取用户列表
			getDemands() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
                    debugger;
					this.total = res.data.total;
					this.demands = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			getDemandSkills(){
				getDemandSkillList().then((res) => {
					this.skills = res.data.skills;
				});
				
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getDemands();
			this.getDemandSkills();
		}
	}

</script>

<style scoped>

</style>
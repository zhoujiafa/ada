<template>
    <div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.companyCode" placeholder="门店编码" class="handle-input mr10"></el-input>
                <el-input v-model="query.companyName" placeholder="门店名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <!--<el-button type="success" icon="el-icon-download" @click="importExcel">Excel 导入</el-button>-->
                <el-upload
                        class="upload-demo"
                        action="http://localhost:8082/companydict/import"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <el-button icon="el-icon-download" size="small" type="primary">点击上传</el-button>
                    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>

            </div>
            <el-table
                    :data="companyList"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <!--<el-table-column prop="companyCode" label="code"></el-table-column>
                <el-table-column prop="companyName" label="Name"></el-table-column>-->
                <el-table-column
                        align="center"
                        prop="id"
                        label="ID"
                        width="50"
                        v-if="ID">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="companyCode"
                        label="门店编码"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="companyName"
                        label="门店名称"
                        width="220">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="mopDeptCode"
                        label="经销商编码"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="mopDeptName"
                        label="经销商名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="customerName"
                        label="代理商名称"
                        v-if="customerName"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="xunsoftDeptCode"
                        label="部门编码"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="xunsoftDeptName"
                        label="部门名称"
                        width="167">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="customerCode"
                        label="代理商编码"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="代理商名称"
                        width="200">
                    <template slot-scope="scope">
                    <el-select
                            v-model="scope.row.customerCode"  filterable placeholder="请选择"
                            @change="changeAsso(scope.row.id,scope.row.customerCode)">
                        <el-option
                                v-for="item in assList"
                                :key="item.customerCode"
                                :label="item.customerName"
                                :value="item.customerCode">
                        </el-option>
                    </el-select>

                    </template>
                </el-table-column>

            </el-table>
            <div class="pagination" style="width: 100%;text-align: left;margin-top: 10px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handlePageChange"
                        :current-page="page"
                        :page-sizes="[10,20,30,50,100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
    import * as API from '../../../api/index';
    import Upload from 'element-ui/packages/upload/src/upload';

    export default {
        name: 'brand',
        components: { Upload },
        data() {
            return {
                customerCode:'',
                assList: [],
                companyList: [],
                pageTotal: 100,
                page: 1,
                size: 10,
                query: {
                    companyCode: '',
                    companyName: ''
                },
            };
        },
        created() {
            this.getData();
            this.getAssoListData();
        },
        methods: {
            // 获取数据
            getData: function() {
                console.log(this.query);
                API.page_CompanyDict(this.page, this.size, this.query).then(res => {
                    //debugger
                    this.companyList = res.body.records;
                    this.pageTotal = res.body.total;
                });
            },
            getAssoListData: function() {
                API.asso_list().then(res => {
                     //debugger
                    this.assList = res;
                });
            },
            handleEdit: function() {

            },
            handleSearch: function() {
                this.getData();
            },
            importExcel: function() {

            },

            handlePageChange: function(val) {
                this.page = val;

                this.getData();
            }, handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val;
                this.getData();
            },
            handleSelectionChange(val) {
                // this.multipleSelection = val;
                // console.log(val);
            },
            changeAsso(id,customerValue) {
                //debugger
                console.log('当前行id的值为：' + id);
                console.log('下拉框选中的值为：' + customerValue);
                this.opens();
                let params = {
                    companyDictID: 0,
                    customerCode: ''
                };
                params.companyDictID = id;
                params.customerCode = customerValue;
                console.log(params);

                API.comp_update(params).then(res => {
                });
            },
            opens() {
                this.$confirm('此操作将进行更新, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'cancel',
                        message: '已取消操作'
                    });
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，请勿重复选择！`);
                /*this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);*/
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    };
</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .success {
        color: #67C23A;
    }

    .danger {
        color: #F56C6C;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>



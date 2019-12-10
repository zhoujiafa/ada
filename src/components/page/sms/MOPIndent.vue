<template>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.orderNo" placeholder="订货单号" class="handle-input mr10"></el-input>
                <el-input v-model="query.companyName" placeholder="门店名称" class="handle-input mr10"></el-input>
                <span style="color: #97a8be">
                    到货日期 :
                    <el-date-picker class="mr10"
                                    v-model="value1"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                    </el-date-picker>
                </span>

                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="warning" icon="el-icon-delete" @click="handleSearch">重置</el-button>
                <el-button type="success" icon="el-icon-plus" @click="addMOPIndent">新增</el-button>
                <el-button type="info" icon="el-icon-download" @click="delAllSelection">导出</el-button>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        default-expand-all
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                            prop="date"
                            label="门店名称"
                            sortable
                            align="center"
                            width="137">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="订货单号"
                            sortable
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="到货日期"
                            sortable
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="单据类型编码"
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="单据类型名称"
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="付款状态"
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="单据状态编码"
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="单据状态名称"
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="单据创建时间"
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="单据创建人"
                            align="center"
                            width="100">
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


            <!-- 新增弹出框 -->
            <el-dialog title="新增信息" :visible.sync="addMOPIndentVisible" width="30%">
                <el-form label-width="100px">
                    <el-form-item label="公司编码:">
                        <el-select v-model="query.companyCode" placeholder="请选择公司">
                            <el-option key="1" label="广东分公司" value="0181"></el-option>
                            <el-option key="2" label="广西分公司" value="0325"></el-option>
                            <el-option key="3" label="广宁分公司" value="0326"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订货单号:">
                        <el-input v-model="query.orderNo"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="preview()" type="primary">查询预览</el-button>
                <el-button @click="addMOPIndentVisible = false">取 消</el-button>
            </span>
            </el-dialog>

            <!-- 预览弹出框 -->
            <el-dialog title="预览信息" :visible.sync="previewVisible" width="98%">
                <div>
                    <el-table
                            :data="tableData"
                            border
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                    >
                        <el-table-column
                                align="center"
                                prop="companyCode"
                                label="公司编码"
                                width="105">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="companyName"
                                label="公司名称"
                                width="220">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="orderNo"
                                label="订货单号"
                                width="230">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="orderType"
                                label="单据类型编码"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="orderTypeName"
                                label="单据类型名称"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="payStatusName"
                                label="付款名称"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="orderStatus"
                                label="付款状态"
                                v-if="orderStatus"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="createDate"
                                label="创建日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="createName"
                                label="单据创建人"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="到货日期"
                                prop="deliveryDate"
                                width="180">
                        </el-table-column>
                    </el-table>
                </div>
                <span>单据子项</span>
                <div>
                    <el-table
                            :data="tableDataItem"
                            border
                            header-cell-class-name="table-header"
                            class="table">
                        <el-table-column
                                align="center"
                                label="商品名称"
                                prop="itemName">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="商品编码"
                                prop="itemCode">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="商品当前单位数量"
                                prop="itemQuantity">
                        </el-table-column>
                        <!--<el-table-column
                                align="center"
                                label="商品当前单位"
                                prop="itemUnit">
                        </el-table-column>-->
                        <el-table-column
                                align="center"
                                label="商品规格名称"
                                prop="specName">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="SKU编码"
                                prop="skuBarcode">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="订货价"
                                prop="listPrice">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="商品总额"
                                prop="lineTotal">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="实付单价"
                                prop="realPrice">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="实付总额"
                                prop="realPriceLineTotal">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="优惠金额"
                                prop="promotionMoney">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="运费"
                                prop="totalExpressFee">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="商品规格名称"
                                prop="specName">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="商品基本单位"
                                prop="unit">
                        </el-table-column>
                    </el-table>

                    <span slot="footer" class="dialog-footer">
                <el-button @click=" previewVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMOPIndent()">确定保存</el-button>
            </span>
                </div>
            </el-dialog>


        </div>
</template>

<script>
    import * as API from '../../../api/index';
    export default {
        data() {
            return {
                tableData: [],
                tableDataItem: [],
                pageTotal: 100,
                addMOPIndentVisible:false,
                previewVisible: false,
                page: 1,
                size: 10,
                query: {
                    orderNo: '',
                    companyName: '',
                    companyCode:''
                }
            };
        },
        created() {
            this.tableData();
        },
        methods: {
            tableData: function() {
                console.log(this.query);
                API.page_MOPIndent(this.page, this.size, this.query).then(res => {
                    //debugger
                    this.tableData = res.body.records;
                    this.pageTotal = res.body.total;
                });
            },
            handleSearch: function() {
                this.getData();
            },
            handlePageChange: function(val) {
                this.page = val;

                this.getData();
            }, handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val;
                this.getData();
            },
            addMOPIndent: function() {
                this.addMOPIndentVisible = true;
            },
            preview: function() {
                API.getMOPIndent(this.dataLineQuery).then(res => {
                    debugger;
                    this.tableData = res.body;
                    this.tableDataItem =res.body[0].lines;

                });
                this.previewVisible = true;
            },
            saveMOPIndent() {
                let params = {
                    companyCode: '',
                    companyName: '',
                    orderNo: '',
                    deliveryDate: '',
                    orderType: '',
                    orderTypeName: '',
                    payStatusName: '',
                    orderStatus: '',
                    orderStatusName: '',
                    needStatus: '',
                    createDate: '',
                    createName: '',
                    lines: null,
                };
                params.companyCode = this.query.companyCode;
                params.companyName = this.tableData[0].companyName;
                params.orderNo = this.tableData[0].orderNo;
                params.deliveryDate = this.tableData[0].deliveryDate;
                params.orderType = this.tableData[0].orderType;
                params.orderTypeName = this.tableData[0].orderTypeName;
                params.payStatusName = this.tableData[0].payStatusName;
                params.orderStatus = this.tableData[0].orderStatus;
                params.orderStatusName = this.tableData[0].orderStatusName;
                params.needStatus = this.tableData[0].needStatus;
                params.createDate = this.tableData[0].createDate;
                params.createName = this.tableData[0].createName;
                params.lines = this.tableData[0].lines;
                API.indent_localInfo(this.query).then(res => {
                    debugger
                    if(res.body.length>0){
                        this.opens(params);
                    }else{
                        API.indent_Save(params).then(res => {
                            this.$message({
                                message: '恭喜你，这是一条成功消息',
                                type: 'success'
                            });
                        });
                    }
                });
            },
            opens: function(params) {
                this.$confirm('检测到已存在的单据信息，是否强制保存修改？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认保存',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        API.indent_Save(params).then(res => {
                        });
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '放弃保存并离开页面'
                                : '停留在当前页面'
                        })
                    });
            },
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
        width: 120px;
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

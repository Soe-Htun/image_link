<template>
  <div class="hello">
    <div class="container" id="demo">
      <el-form :inline="true" id="input" class="demo-form-inline">
        <el-form-item label="ID" prop="name" >
          <el-input v-model="name" placeholder="ID" id="idinput" style="width:120px;margin-right:20px "></el-input>
          <span style="margin-right:25px;font-size:25px">/</span>
        </el-form-item>
        <el-form-item label="Date" prop="date1">
          <el-date-picker v-model="date" placeholder="Date" value-format="yyyy/MM/dd" :picker-options="pickerOptions" style="width:140px;margin-right:20px">
          </el-date-picker>
          <span style="margin-right:25px;font-size:25px;">/</span>
        </el-form-item>
        <el-form-item label="GameTable" prop="region">
          <el-select v-model="table" @change="editvalue" style="width:120px;margin-right:20px" >
            <el-option
            v-for="item in options" 
            :key="item.NickName" 
            :label="item.Name" 
            :value="item.NickName"></el-option>
          </el-select>
          <span style="margin-right:25px;font-size:25px">/</span>
        </el-form-item>
        <el-form-item label="Round" prop="round">
          <el-input v-model="round" id="aa" placeholder="暂无" @input="editvalue1" style="width:120px;margin-right:45px"  :disabled="disable">  
          </el-input>
        </el-form-item>
        <el-form-item label="Game" prop="game" >
          <el-input v-model="game" placeholder="游戏" style="width:120px;margin-right:95px" :disabled="disabled">
          </el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="search">SEARCH</el-button>
        </el-form-item>
        </el-form>

        <el-table :data="arr" border style="width:100%;text:center;margin:auto;">
          <el-table-column prop="date" label="Date">
          </el-table-column>
          <el-table-column label="File Name">
            <template slot-scope="scope">
              <span @click="handle(scope.$index,scope.row)">
                {{ scope.row.name}}
              </span>
            </template>
          </el-table-column>
        </el-table>
         
        <div id="show" style="display:none"> 

        </div>
    </div>
    <div id="image">
      <span  id="cancel" @click="cancel"><i class="fas fa-times"></i></span>
        <el-carousel :loop="false" indicator-position="none" :autoplay="false" height="966px">
          <el-carousel-item v-for="arr in arr" :key="arr.url">
            <img id="photo" :src="arr.url">
          </el-carousel-item>
        </el-carousel> 
        <!-- <span v-for="arr in this.arr" :key="arr" ><img id="photo" :src="arr.url"></span> -->
    </div>
  </div>

  <!-- <img :src="scope.row.url"> -->
</template>
<script>
import axios from 'axios'
var urllink = 'http://47.56.5.181:8080/betImage/'
export default {
  name: 'HelloWorld',
  data() {
    return {
        options:[
        {"Name":"全部","NickName":"全部"},
        {"Name":"龙虎1号","NickName":"L1"},
        {"Name":"测试区龙虎","NickName":"L7"},
        {"Name":"百家乐7号","NickName":"百家乐7号台"},
        {"Name":"测试区百家","NickName":"CS-B"},
        {"Name":"牛牛2号","NickName":"N2"},
        {"Name":"测试区牛牛","NickName":"N3"},
        {"Name":"百家乐1号","NickName":"百1"},
        {"Name":"同步龙虎3","NickName":"龙3"},
        {"Name":"同步百3","NickName":"百3"},
        {"Name":"同步百5","NickName":"百5"},
        {"Name":"技术测试使用","NickName":"JC"},
        {"Name":"百家乐7号","NickName":"百7"},
        {"Name":"龙虎5号","NickName":"龙5"},
        {"Name":"高防百家","NickName":"gf1"},
        {"Name":"高防龙虎","NickName":"gf2"},
        {"Name":"高防牛牛","NickName":"gf3"},
        {"Name":"高防䐨宝","NickName":"gf4"},
        {"Name":"高防轮盘","NickName":"gf5"},
        {"Name":"测试百22","NickName":"B22"}
        ],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        name:'',
        date: new Date(),
        table:'全部',
        round:'',
        game:'',
        arr: [],
        disable: true,
        disabled: true,
        src:''
      }
    },
     methods: {
      handle(index,row) {
        console.log(row.url);
        document.getElementById('image').style.display = "block"
        document.getElementById('demo').style.display = "none";
      },
      cancel(){
        this.dialog=false;
        document.getElementById('demo').style.display = "block"
        document.getElementById('image').style.display = "none"
      },
      editvalue(){
        this.disable = false
      },
        editvalue1(){
          this.disabled = false
      },
      search() {
        if(this.name == ''){
          this.$message({
            showClose: true,
            message: 'Please, enter ID Number.',
            type: 'error'
         });
        }
        else{
            axios.get( urllink + this.name + '/' + this.date ).then( response =>{
            var data = document.getElementById('show');
            data.innerHTML = response.data;
            var a = data.getElementsByTagName('a');
            this.arr=[];
            for (var i=1; i<a.length; i++){
              if(this.table=='全部'){
                var json_data = {
                  name: a[i].innerHTML,
                  date: this.date.slice(2,10),
                  url: urllink + this.name + '/' + this.date + '/' + a[i].innerHTML
                };
              this.arr.push(json_data);
              }
              
              else if(a[i].innerHTML.slice(9,14).includes(this.table) && a[i].innerHTML.slice(12,16).includes(this.round) && a[i].innerHTML.slice(14,19).includes(this.game)){
              json_data= {
                  name: a[i].innerHTML,
                  date: this.date.slice(2,10),
                  url: urllink + this.name + '/' + this.date + '/' + a[i].innerHTML
                };
              this.arr.push(json_data)
              }
              // console.log(json_data.url)
            }  
          //document.getElementById('data').innerHTML = JSON.stringify(this.arr);   
          });
      }      
    },
  },
}
</script>


<style scoped>
#input{
  margin: 15px 15%; 
}
#image{
  display:none;
  width:100%;
  background-color:black;
}
  #cancel{
    font-size:24px;
    color:white;
    opacity:0.7;
    float:right;
    margin-right:8px;
  }
  #photo{
    margin:0 auto;
    width: 100%;
    margin:2% 1.2%;
  }
#cancel:hover{
  opacity:10;
}
</style>

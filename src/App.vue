<script setup>
import { useCompanyData } from './composables/useCompanyData'
import { onMounted, ref } from 'vue';

const { getAllCompany, updateCompany, addCompany, deleteCompany } = useCompanyData();

const isLoading = ref(true);

const newCompanyName = ref('');
const newOwnerID = ref('');

const allCompanyData = ref([]);

onMounted(()=>{
  updateCompanyList();
});

async function updateCompanyList() {
  allCompanyData.value = await getAllCompany();
  console.log(allCompanyData.value);
  isLoading.value = false;
}

async function onAddCompany(companyName, ownerID) {
  isLoading.value = true;
  await addCompany(companyName, ownerID);
  updateCompanyList();
}

async function onUpdateCompany(companyID, companyName) {
  isLoading.value = true;
  await updateCompany(companyID, companyName);
  updateCompanyList();
}

async function onDeleteCompany(companyID) {
  isLoading.value = true;
  await deleteCompany(companyID);
  updateCompanyList();
}

</script>

<template>
  <div class="container">
    <div class="title">公司資料列表</div>
    <div class="is-loading" v-if="isLoading">讀取中...</div>
    <div v-else>
      <ul>
        <li class="tab-style">
          <div>公司ID</div>
          <div>公司名稱</div>
          <div>創建日期</div>
          <div>擁有者ID</div>
          <div>更新按鈕</div>
          <div>刪除按鈕</div>
        </li>
        <li class="tab-style" v-for="item in allCompanyData" :key="item.id">     
          <span>{{ item.id }}</span>
          <input type="text" v-model="item.name">
          <span>{{ item.create_at }}</span>
          <span>{{ item.owner }}</span>
          <button @click="onUpdateCompany(item.id, item.name)" :disabled="isLoading">更新</button>
          <button @click="onDeleteCompany(item.id)" :disabled="isLoading">刪除</button>
        </li>
      </ul>
    </div>
    
    <div class="sub-title">新增資料</div>
    <span class="input-group">
      <label>Company Name：</label>
      <input type="text" v-model="newCompanyName">
    </span>
    <span class="input-group">
      <label>Owner ID：</label>
      <input type="number" v-model="newOwnerID">
    </span>
    <button @click="onAddCompany(newCompanyName, newOwnerID)" :disabled="isLoading">新增</button>
  </div>

</template>

<style scoped>
  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 10px 0;
  }

  li:first-child {
    margin: 10px 0 20px 0;
  }

  .container {
    max-width: 1200px;
    padding: 0 15px;
    margin: 0 auto;
  }

  .is-loading {
    margin: 100px 0;
    text-align: center;
    font-size: 20pt;
    font-weight: 600;
    color: red;
  }

  button:disabled {
    background-color: #ccc;
  }

  .title {
    margin: 20px 0;
    font-size: 20pt;
    font-weight: 600;
    text-align: center;
  }

  .sub-title{
    margin: 50px 0 20px 0;
    font-size: 16pt;
    font-weight: 600;
  }
  
  .tab-style {
    display: grid;
    grid-template-columns: 80px 300px 300px 80px auto auto;
    justify-items: center;
    align-items: center;
    column-gap: 10px;
  }

  .input-group {
    padding: 0 20px 0 0;
  }

</style>

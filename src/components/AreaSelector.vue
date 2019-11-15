<template>
  <div class="area-selector">
    <van-picker :columns="columns" value-key="regionName" @change="onChange" />
  </div>
</template>

<script>
import ASH from "../utils/ASHelper";

export default {
  name: "area-selector",
  data() {
    return {
      columns: [],
      loading: false
    };
  },

  created() {
    this.$ASH = new ASH();
    this.loading = true;
    this.$ASH
      .init()
      .then(ok => {
        this.loading = false;
        this.columns = this.$ASH.asParam();
      })
      .catch(err => {
        this.loading = false;
      });
  },

  methods: {
    onChange(picker, values, index) {
      // let changeprovince = values[0].regionName;
      // if(changeprovince == '香港特别行政区' || changeprovince == '澳门特别行政区' || changeprovince == '台湾省'){
      //   this.colums=[]
      // }
      values = values.filter(e => e);
      this.loading = true;
      this.$ASH
        .onChange(values)
        .then(updateOk => {
          this.loading = false;

          this.columns = this.$ASH.asParam();
          console.log(this.columns);
          this.$emit(
            "listen",
            this.$ASH.selecteds
              .filter(e => e)
              .map(e => e.regionName)
              .join("-")
          );
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>


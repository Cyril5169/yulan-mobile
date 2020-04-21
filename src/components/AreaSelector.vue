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
      values = values.filter(e => e);
      this.loading = true;
      this.$ASH
        .onChange(values)
        .then(updateOk => {
          this.loading = false;
          this.columns = this.$ASH.asParam();
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


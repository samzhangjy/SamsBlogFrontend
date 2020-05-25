<template>
  <v-container>
    <div class="mb-10"></div>
    <h1 class="display-2 text-center">关于</h1>
    <br>
    <v-divider></v-divider>
    <br>
    <p class="text-center">
      欢迎来到我的博客！我是Sam Zhang，一个Python爱好者，一个Node.js小白，也是一个小黄人的粉丝！
    </p>
    <v-container class="justify-center text-center">
      <v-container class="justify-center text-center">
        <v-row justify="center">
          <v-col sm="3">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <a v-on="on" href="https://www.zhihu.com/people/zhang-shou-wen-11" target="_blank">
                  知乎
                </a>
              </template>
              <span>在知乎上关注我</span>
            </v-tooltip>
          </v-col>
          <v-col sm="3">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <a v-on="on" href="https://github.com/samzhangjy" target="_blank">
                  <v-icon large>mdi-github</v-icon>
                </a>
              </template>
              <span>Fork me on GitHub</span>
            </v-tooltip>
          </v-col>
          <v-col sm="3">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <a v-on="on" href="https://gitlab.com/samzhangjy" target="_blank">
                  <v-icon large>mdi-gitlab</v-icon>
                </a>
              </template>
              <span>Fork me on GitLab</span>
            </v-tooltip>
          </v-col>
          <v-col sm="3">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <a v-on="on" href="mailto:samzhang951@outlook.com">
                  <v-icon large>mdi-email</v-icon>
                </a>
              </template>
              <span>发邮件给我</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'About',

  data: () => ({
  })
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 30px;
}
</style>

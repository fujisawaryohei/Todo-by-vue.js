(function(){
  'use strict';
  //双方向バインディング
  //データバインディングとはdataとUIを結びつけるもの。双方向はそのまま。
  //viewモデルとはdataとmodelを結びつけているもの
  //下記の変数vm以下がview modelといい、UIにバインディングされるモデル。
  var vm = new Vue({
    //下記はデータモデルで、viewと結びついた状態をview modelと言われる。
    el:'#app',
    data:{//モデル定義プロパティ
      newItem:'',
      todos: []
    },
    watch:{
      todos:{//todos配列に変更が与えられた時、localstorageに保存させる処理。
        handler:function(){
          localStorage.setItem('todos',JSON.stringify(this.todos));
        },//JSONformatで保存させる。HTML側で指定されているtodo
        deep:true
      }
    },
    mouted:function(){
      this.todos=JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods:{//関数プロパティ
      addItem:function(e){
        //data内のデータにはthisでアクセスできる。
        //preventDefaultがイベントキャンセルしてくれる関数
        e.preventDefault();
        var item={
          title:this.newItem,
          isDone:false
        };
        this.todos.push(item);
        this.newItem="";
      },
      deleteItem:function(index){
        if (confirm="are you sure?")
        this.todos.splice(index,1)
        //splice(array,index,offset)
        //arrayが配列
        //spliceはindex番目のoffset分のlengthを削除する
      },
      purge:function(){
        if (!confirm("delete finished??")){
          return;//confirmは真偽値を返す。今回はnoだったらそのまま返す。
        }
        this.todos=this.remaining;//remainingで配列を返す。
      }
    },
    computed:{//算出プロパティ
      remaining:function(){
         return this.todos.filter(function(todo){
          return !todo.isDone;
        });
      }//プロパティ下の関数名定義後の関数は;がいらない!!
    }
  });
})();

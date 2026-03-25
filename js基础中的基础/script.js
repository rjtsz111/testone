console.log('script 已加载');
// 1. 获取 DOM 元素
const taskInput = document.getElementById('taskInput'); // 查找 一个 id 为 taskInput 的元素
const addTaskBtn = document.getElementById('addTaskBtn'); // 查找 一个 id 为 addTaskBtn 的元素
const taskList = document.getElementById('taskList');

// 页面刚加载时，先把按钮禁用
addTaskBtn.disabled = true;

// 2. 监听输入框内容变化
taskInput.addEventListener('input', function () {
  addTaskBtn.disabled = taskInput.value.trim() === '';
});

// 3. 添加任务函数
function addTask() {
  // 获取用户输入的值，并移除两端的空白
  const taskText = taskInput.value.trim(); /* trim：去掉字符串两边的空白字符。 */

  // 检查输入是否为空，如果 taskText 是空字符串，就弹出提示“请输入一个任务！”，然后直接停止后面的执行。
  if (taskText === "") {
    alert("请输入一个任务！"); /* alert 就是浏览器里的提示框 / 弹窗，浏览器内置 */
    return; // 阻止函数继续执行
  }

  // 4. 创建新的列表项 (<li>) 元素
  const listItem = document.createElement('li');
  listItem.textContent = taskText; // 设置列表项的文本内容

  // 5. 创建删除按钮
  const deleteBtn = document.createElement('span');
  deleteBtn.textContent = 'X';
  deleteBtn.className = 'delete-btn';

  // 6. 为删除按钮添加事件监听器
  // 点击“删除按钮”时，任务从列表里删掉，并且避免同时触发别的点击事件。
  deleteBtn.addEventListener('click', function (e) { /* e 里面有很多关于点击的信息。给删除按钮 deleteBtn 绑定一个点击事件。也就是说，只要你点这个按钮，就会执行里面的代码。 */
    // 阻止事件冒泡到父级 listItem，防止触发完成/未完成切换
    e.stopPropagation(); /* 只执行按钮自己的点击，不要再传给父元素。 */
    // 移除整个列表项
    taskList.removeChild(listItem); /* 从 taskList 里删除 listItem 这个元素。 */
  });

  // classList 是浏览器提供的一个“class 操作工具”，可以很方便地：
  // add() 加 class
  // remove() 删 class
  // toggle() 有就删，没有就加
  // contains() 判断有没有某个 class

  // 7. 为列表项添加点击事件（用于标记完成/未完成）
  listItem.addEventListener('click', function () {
    // 切换 'completed' CSS 类
    listItem.classList.toggle('completed'); /* toggle：如果有这个类，就删掉；如果没有这个类，就加上 */
  });

  // 8. 将删除按钮添加到列表项
  listItem.appendChild(deleteBtn);

  // 9. 将新的列表项添加到待办列表 (<ul>) 中
  taskList.appendChild(listItem);

  // 10. 清空输入框，以便输入下一个任务
  taskInput.value = '';

  // 清空后重新禁用按钮
  addTaskBtn.disabled = true;
}

// 11. 绑定事件：点击按钮时添加任务
addTaskBtn.addEventListener('click', addTask);
console.log('211213123');
// 12. 绑定事件：按回车键时也添加任务
taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
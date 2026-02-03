# 配置用户名（替换为你的名字/昵称，引号可加可不加，有空格必须加）
git config --global user.name "Your Name"

# 配置邮箱（替换为你的常用邮箱，建议和 GitHub/Gitee 等代码平台的注册邮箱一致）
git config --global user.email "your_email@example.com"


你需要一份 Git 常见操作的命令行总结，我会按照「日常开发流程」和「功能分类」来整理，兼顾新手易用性和实用性，每个命令都附带简明解释和使用场景。

---

## 一、基础准备与仓库操作
这部分是 Git 操作的起点，包括仓库初始化、远程仓库关联。

### 1. 初始化本地仓库
在当前目录创建一个新的 Git 仓库（生成 `.git` 隐藏目录，用于存储版本信息）：
```bash
# 初始化当前目录为 Git 仓库
git init

# 初始化时指定仓库目录名（会创建该目录并初始化 Git 仓库）
git init my-project
```

### 2. 克隆远程仓库
将已存在的远程仓库（如 GitHub/Gitee）完整复制到本地：
```bash
# HTTPS 方式（无需配置密钥，每次推送可能需要输入账号密码）
git clone https://github.com/xxx/xxx-project.git

# SSH 方式（需提前配置 SSH 密钥，后续操作无需重复验证，推荐）
git clone git@github.com:xxx/xxx-project.git

# 克隆时指定本地目录名
git clone https://github.com/xxx/xxx-project.git my-local-project
```

### 3. 关联远程仓库
如果本地仓库已存在，需要关联到远程仓库（后续用于推送/拉取代码）：
```bash
# 查看当前已关联的远程仓库（简称通常为 origin）
git remote -v

# 关联远程仓库（给远程仓库起别名 origin，可自定义）
git remote add origin git@github.com:xxx/xxx-project.git

# 修改已关联的远程仓库地址（如切换 HTTPS 到 SSH）
git remote set-url origin git@github.com:xxx/xxx-project.git

# 移除已关联的远程仓库
git remote remove origin
```

---

## 二、日常开发核心流程（最常用）
流程：`修改代码` → `查看状态` → `添加到暂存区` → `提交到本地仓库` → `拉取远程最新代码` → `推送到远程仓库`

### 1. 查看工作区/暂存区状态
查看哪些文件被修改、新增、删除，以及是否已加入暂存区：
```bash
git status

# 简化输出（更简洁，需提前配置别名 st，或直接执行）
git status --short
```

### 2. 添加文件到暂存区
将修改/新增的文件纳入暂存区，为后续提交做准备（暂存区相当于「提交缓冲区」）：
```bash
# 添加单个文件到暂存区
git add filename.ext

# 添加当前目录下所有修改/新增的文件（不包含未跟踪的忽略文件）
git add .

# 添加当前目录下所有文件（包括隐藏文件，慎用，一般用 git add . 即可）
git add -A

# 撤销暂存区的某个文件（回到工作区未暂存状态）
git reset HEAD filename.ext
```

### 3. 提交到本地仓库
将暂存区的文件提交到本地 Git 仓库，生成版本记录（必须填写提交说明，描述本次修改内容）：
```bash
# 基础提交（会打开默认编辑器，填写提交说明后保存退出）
git commit

# 直接在命令行填写提交说明（最常用，简洁高效）
git commit -m "feat: 新增用户登录功能"

# 跳过暂存区，直接将已跟踪（曾经提交过）的修改文件提交（新增文件无法用此命令）
git commit -am "fix: 修复登录按钮点击无响应问题"

# 修正最后一次提交（如提交说明写错、漏加少量文件，不会生成新的提交记录）
git commit --amend -m "修正：新增用户登录功能（补充验证码）"
```

### 4. 拉取远程仓库最新代码
在推送自己的代码前，优先拉取远程最新代码，避免冲突：
```bash
# 拉取远程默认分支（如 main）的最新代码，并自动合并到本地当前分支
git pull origin main

# 仅拉取远程代码，不自动合并（后续可手动合并，新手较少用）
git fetch origin main
```

### 5. 推送到远程仓库
将本地仓库的提交记录推送到远程仓库，同步代码：
```bash
# 推送本地当前分支到远程 origin 对应的分支（首次推送建议加 -u，建立关联）
git push -u origin main

# 后续推送（已建立分支关联后，可简化）
git push

# 强制推送（慎用！会覆盖远程仓库的对应分支记录，仅在自己的独立分支或确认无他人协作时使用）
git push -f origin main
```

---

## 三、分支操作
分支是 Git 的核心优势，用于隔离不同功能的开发（如主分支、功能分支、修复分支），日常开发避免直接在主分支（main/master）上修改。

### 1. 查看分支
```bash
# 查看本地所有分支（当前分支前会有 * 标记）
git branch

# 查看本地+远程所有分支
git branch -a

# 查看分支的详细信息（如最后一次提交、关联的远程分支）
git branch -v
```

### 2. 创建与切换分支
```bash
# 创建新分支（仅创建，不切换）
git branch feature/login

# 创建新分支并立即切换到该分支（最常用）
git checkout -b feature/login

# Git 2.23+ 新增更直观的切换命令（替代 git checkout）
git switch -c feature/login

# 切换到已存在的本地分支
git checkout main
# 或
git switch main

# 切换到远程分支（并创建对应的本地分支，关联远程）
git checkout -b feature/pay origin/feature/pay
```

### 3. 合并分支
将其他分支的修改合并到当前分支（如功能开发完成后，合并到主分支）：
```bash
# 1. 先切换到目标分支（如要将 feature/login 合并到 main，先切换到 main）
git switch main

# 2. 拉取 main 分支远程最新代码（避免合并冲突）
git pull origin main

# 3. 合并 feature/login 分支到当前 main 分支
git merge feature/login

# 4. 合并完成后，推送 main 分支到远程
git push origin main
```

### 4. 删除分支
```bash
# 删除本地已合并的分支（安全，未合并的分支会提示无法删除）
git branch -d feature/login

# 强制删除本地分支（无论是否合并，慎用！）
git branch -D feature/login

# 删除远程分支
git push origin --delete feature/login
```

### 5. 解决合并冲突
合并分支时如果出现文件修改冲突（同一文件同一位置被不同分支修改），Git 会提示冲突文件。
1.  打开冲突文件，查找 `<<<<<<< HEAD`、`=======`、`>>>>>>> 分支名` 标记的冲突区域
2.  保留需要的代码，删除冲突标记和无用代码
3.  重新将冲突文件添加到暂存区 `git add 冲突文件名`
4.  完成合并提交 `git commit -m "resolve: 合并登录功能分支，解决xxx冲突"`

---

## 四、版本回退与撤销
用于修正错误提交、恢复到历史版本。

### 1. 查看历史提交记录
```bash
# 查看完整提交记录（按时间倒序，q 键退出查看）
git log

# 简化输出（每条记录一行，更清晰）
git log --oneline

# 美化输出（带分支图、颜色，需提前配置别名 lg，或直接执行完整命令）
git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

### 2. 回退到历史版本
```bash
# 方式1：git reset（修改本地仓库历史，推送到远程需强制推送，慎用）
# 回退到指定版本（commit_id 是 git log 中看到的版本哈希值，前6-8位即可）
# --soft：仅回退仓库，暂存区和工作区不变（可重新提交）
git reset --soft commit_id

# --mixed（默认）：回退仓库和暂存区，工作区不变（最常用）
git reset commit_id

# --hard：回退仓库、暂存区、工作区，所有修改全部丢失（慎用！无法恢复）
git reset --hard commit_id

# 方式2：git revert（创建新的提交记录，撤销指定版本的修改，不修改历史，推荐协作场景使用）
git revert commit_id

# 撤销最后一次提交（会打开编辑器填写撤销说明）
git revert HEAD
```

### 3. 撤销工作区的修改
将工作区中未暂存的修改恢复到「最近一次提交/暂存」的状态：
```bash
# 撤销单个文件的工作区修改
git checkout -- filename.ext

# Git 2.23+ 更直观的命令
git restore filename.ext

# 撤销当前目录下所有工作区未暂存的修改
git restore .
```

---

## 五、其他实用辅助命令
```bash
# 查看忽略文件（.gitignore）是否生效，以及文件未被跟踪的原因
git check-ignore -v filename.ext

# 清理工作区的未跟踪文件（如编译产物、临时文件，慎用！删除后无法恢复）
# 先查看会清理哪些文件（不实际删除）
git clean -n

# 强制删除未跟踪的文件和目录
git clean -fd

# 查看两个分支的差异（哪些文件被修改）
git diff branch1 branch2
```

---

### 总结
1.  日常开发核心流程：`git add .` → `git commit -m "说明"` → `git pull origin main` → `git push origin main`。
2.  分支操作遵循「创建-开发-合并-删除」流程，避免直接修改主分支，核心命令是 `git checkout -b`/`git switch -c`、`git merge`。
3.  版本回退优先使用 `git revert`（不修改历史），本地调试可使用 `git reset`，`--hard` 选项慎用。
4.  推送代码前先拉取（`git pull`），是避免合并冲突的关键好习惯。

你想了解 Git 中 `tag`（标签）的相关操作，`git tag` 主要用于给项目的关键版本（比如 v1.0.0、v2.1.3 正式版）打上标记，方便后续快速回溯到该版本，比通过提交哈希值查找更直观易记。

Git 中的标签分为两种：
1.  **轻量标签（Lightweight）**：仅保存版本的提交哈希值，相当于一个「只读的分支书签」，无额外信息，适合本地临时标记。
2.  **附注标签（Annotated）**：包含标签作者、邮箱、创建时间、标签说明等完整元数据，会被纳入 Git 的版本历史，适合正式发布版本（推荐）。

---

## 一、创建标签
### 1. 创建轻量标签
格式简单，仅指定标签名即可，无额外附加信息：
```bash
# 给当前最新提交创建轻量标签（标签名通常遵循 vx.y.z 格式）
git tag v1.0.0

# 给指定历史提交创建轻量标签（commit_id 是 git log 查到的提交哈希值，前6-8位即可）
git tag v0.9.0 abc1234
```

### 2. 创建附注标签（推荐，正式版本使用）
使用 `-a`（annotated）指定标签名，`-m` 填写标签说明（类似 commit 的 `-m`），会记录完整元数据：
```bash
# 给当前最新提交创建附注标签
git tag -a v1.0.0 -m "正式版 v1.0.0：实现用户登录、商品展示核心功能"

# 给指定历史提交创建附注标签
git tag -a v0.9.0 abc1234 -m "测试版 v0.9.0：完成核心功能开发，待测试"
```

> 补充：如果需要对标签进行 GPG 签名（提高版本可信度，适用于严格的项目管理），可以在附注标签基础上添加 `-s` 选项（替代 `-a`），前提是你已配置 GPG 密钥：
> ```bash
> git tag -s v1.0.0 -m "正式版 v1.0.0（GPG 签名）"
> ```

---

## 二、查看标签
```bash
# 查看所有标签（按字母/版本号顺序排列，不是创建时间顺序）
git tag

# 模糊查询标签（比如查找所有以 v1. 开头的标签）
git tag -l "v1.*"

# 查看单个标签的详细信息（仅对附注标签有效，轻量标签只会显示提交哈希值）
git show v1.0.0
```

> 提示：如果想让标签按创建时间排序，可以使用：
> ```bash
> git tag --sort=-creatordate  # 倒序（最新创建在前）
> git tag --sort=creatordate   # 正序（最早创建在前）
> ```

---

## 三、推送标签到远程仓库
创建的标签默认只存储在**本地仓库**，不会自动同步到远程，需要手动推送，方便团队其他成员获取版本标签。

```bash
# 推送单个标签到远程仓库
git push origin v1.0.0

# 推送本地所有未推送的标签到远程仓库（批量推送，高效）
git push origin --tags

# 推送标签时，若远程已存在同名标签，会推送失败，可强制推送（慎用！会覆盖远程同名标签）
git push origin --tags -f
```

---

## 四、删除标签
### 1. 删除本地标签
```bash
git tag -d v1.0.0  # d = delete
```

### 2. 删除远程仓库的标签
需要先删除本地标签，再推送「删除指令」到远程，两步操作：
```bash
# 步骤1：删除本地标签（若已删除可跳过）
git tag -d v1.0.0

# 步骤2：推送删除指令到远程，删除远程对应的标签（两种格式均可，推荐第一种）
git push origin --delete v1.0.0
# 或
git push origin :refs/tags/v1.0.0
```

---

## 五、检出（切换）到指定标签版本
标签不是分支，无法直接「切换」，但可以通过标签创建临时分支，或直接检出标签对应的版本（处于「分离头指针」状态，不建议修改提交）。

### 1. 直接检出标签版本（分离头指针状态）
适合查看该版本的代码，不建议进行修改和提交（修改后的提交无法关联到任何分支，容易丢失）：
```bash
git checkout v1.0.0
```

### 2. 基于标签创建新分支（推荐，如需修改该版本代码）
创建一个新分支关联该标签版本，后续的修改可以提交到这个新分支，避免代码丢失：
```bash
# 基于 v1.0.0 标签创建新分支 hotfix/v1.0.1（用于修复 v1.0.0 版本的 bug）
git checkout -b hotfix/v1.0.1 v1.0.0
# 或（Git 2.23+）
git switch -c hotfix/v1.0.1 v1.0.0
```

---

### 总结
1.  Git 标签分「轻量标签」（本地临时标记）和「附注标签」（正式版本，含完整元数据，推荐）。
2.  核心操作流程：`创建标签`（`git tag -a`）→ `推送远程`（`git push origin --tags`）→ `查看/检出`（`git show`/`git checkout`）→ `删除`（本地 `git tag -d` + 远程 `git push origin --delete`）。
3.  标签用于标记正式版本（如 v1.0.0），方便快速回溯，检出标签后如需修改，建议基于标签创建新分支。
4.  标签名通常遵循 `vx.y.z` 语义化版本规范，便于管理和查询。
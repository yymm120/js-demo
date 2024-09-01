"""""""""""""""""""""""""""""""""""""""""""基本设置"""""""""""""""""""""""""""""""""""""""""""""
filetype on	"开启文件类型侦测
filetype indent on	"适应不同语言的缩进
syntax enable	"开启语法高亮功能
syntax on 	"允许使用用户配色

"""""""""""""""""""""""""""""""""""""""""""显示设置"""""""""""""""""""""""""""""""""""""""""""""
set laststatus=2        	"总是显示状态栏
set ruler               	"显示光标位置
set number              	"显示行号
set cursorline          	"高亮显示当前行
"set cursorcolumn            "高亮显示当前列
set hlsearch                " 高亮搜索结果
exec "nohlsearch"
set incsearch               "边输边高亮
set ignorecase              "搜索时忽略大小写
set smartcase

"set relativenumber          "其他行显示相对行号
set scrolloff=6            "垂直滚动时光标距底部位置


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set fileencodings=utf-8,gb2312,gbk,gb18030,cp936
set fileencoding=utf-8
" set termencoding=utf-8
" set encoding=utf-8




"""""""""""""""""""""""""""""""""""""""""""编辑设置"""""""""""""""""""""""""""""""""""""""""""""
set expandtab   	"扩展制表符为空格
set tabstop=4   	"制表符占空格数
set softtabstop=4	"将连续数量的空格视为一个制表符
set shiftwidth=4	"自动缩进所使用的空格数
"set textwidth=79	"编辑器每行字符数
set wrap            "设置自动折行
set linebreak       "防止单词内部折行
set wrapmargin=5      "指定折行处与右边缘空格数
set autoindent  	"打开自动缩进
set wildmenu    	"vim命令自动补全

noremap <C-k> 5k
noremap <C-j> 5j
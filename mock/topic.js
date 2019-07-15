import Mock from 'mockjs'

const data = Mock.mock({
	"name": "XX考试",
	"directions": {
		"en": "",
		"zh": ""
	},
	"questions": [{
		"id":'1233',
		'part': '听力',
		'name': '一、听短对话，选择正确的答案',
		'type': '单选',
		"directions": {
			'en': 'Listen to 10 short conversations and choose the correct answer for each question.',
			'zh': '听对话，从每题所给的A，B，C三个选项中选择正确选项。'
		},
		"mp3Path":'1.mp3',
		'detail': [{
			'steam': ['What is next to the playground?'],
			'options': ['A. Sports centre Sports centre Sports centre Sports centre Sports centreSports centre', 'B. Sports centre Sports centreSports ', 'C.Sports centre Sports', 'D. Sports centre Sports centreSports'],
			'correct': ['A']
		}, {
			'steam': ['What is next to the playground?'],
			'options': ['A. Sports centre', 'B. Sports centreSports centre', 'C. Sports centre', 'D. Sports centre'],
			'correct': ['B']
		}]
	}, {
		"part": "听力",
		"name": "听对话，填空",
		"type": "填空",
		"directions": {
			"en": "Listen to a conversation between two students and complete the following notes.",
			"zh": "听一段对话，根据所听内容，将以下笔记中的信息补充完整。"
		},
		"detail": [{
			"steam": ["There is a large meeting hall _______ the South Block.", "_______ will begin at 2:00 p.m. "],
			"correct": ["in", "It"]
		}]
	}, {
		"id": '2',
		"part": "听力",
		"name": "听对话，填表格",
		"type": "填表格",
		"directions": {
			"en": "Listen to the programme and complete the table.",
			"zh": "听对话，填表格。"
		},
		"detail": [{
			"steam": ["1.1 Expression", "1.2 Meaning", "1.3 Explanation", "2.1 ___1___", "2.2 A term for a ___2___ man or woma``n", "2.3 Look at this person is a treat for ___3___, just like candy is a treat for the tongue.", "3.1 A kid in a candy store", "3.2 A person is very ___4___ and happy to do something or to simply be somewhere.", "3.3 Like a(n) ___5___ and joyful kid walking from one candy display to the next, ___6___ which candy to choose.", "4.1 As easy as taking candy from a ___7___", "4.2 Talking about something that you may do easily, but ___8___.", "4.3 It would be very easy to take ___9___ from a small, helpless baby, but such ___10___ is heartless."],
			"correct": ["good", "good"]
		}]
	}, {
		"part": "听力",
		"name": "判断题",
		"type": "判断",
		"directions": {
			"en": "Listen to the conversation. Decide if each statement is true or false.",
			"zh": null
		},
		"detail": [{
			"steam": ["It's always a problem for a family with children to find a suitable restaurant on holiday.", "Children can cook by themselves and their parents can clean up for them."],
			"correct": [0, 1]
		}]
	}, {
		"part": "听力",
		"name": "匹配题",
		"type": "匹配",
		"directions": {
			"en": null,
			"zh": null
		},
		"detail": [{
			"steam": ["It’s always a problem for a family with children to find a suitable restaurant on holiday.", "Children can cook by themselves and their parents can clean up for them.", "Around the White House.", "Near the Washington Monument."],
			"correct": ["L1_R1", "L2_R2"]
		}]
	}, {
		"part": "语言知识运用",
		"name": "单选题",
		"type": "单选",
		"directions": {'en': "Choose the correct answer from A, B and C. 从A，B和C三个选项中选出正确选项。"},
		"detail": [{
			"steam": ["--- Do you know the girl ______ the bike? I probably saw her when I was in Mexico. \\n --- Really? It’s my sister. She went to Mexico last summer."],
			"options": ['A. Sports centre', 'B. Sports centreSports centre', 'C. Sports centre', 'D. Sports centre'],
			"correct": ["A"]
		},{
			"steam": ["--- Do you know the girl ______ the bike? I probably saw her when I was in Mexico. \\n --- Really? It’s my sister. She went to Mexico last summer."],
			"options": ['A. Sports centre', 'B. Sports centreSports centre', 'C. Sports centre', 'D. Sports centre'],
			"correct": ["A"]
		}]
	},{
		"part": "语言知识运用",
		"name": "匹配题",
		"type": "匹配",
		"directions": {
			"en": "Match the word with its meaning",
			"zh": "将单词与其释义连线."
		},
		"detail": [{
			"steam": ["1. approach", "2. athlete", "A. having strong power", "B. a shorter text that shows the main idea"],
			"correct": ["0-1","1-0"]
		}]
	}, {
		"part": "语言知识运用",
		"name": "改写题",
		"type": "改写",
		"directions": {
			"en": "Rewrite the sentences by using verb-ing form.",
			"zh": "用动词的ing形式改写下列句子。"
		},
		"detail": [{
			"steam": ["1. A soldier who came from the battlefield made a speech for the public.", "2. He gave the dog that caught the ball a bone."],
			"correct": ['1. A soldier who came from the battlefield made a speech for the public.','2. He gave the dog that caught the ball a bone.']
		}]
	}, {
		"part": "语言知识运用",
		"name": "单句填空题",
		"type": "选词填空",
		"directions": {
			"en": "Complete the sentence by using the words given.",
			"zh": "选择合适的单词补全下列句子。"
		},
		"detail": [{
			"steam": ["1. We haven’t chosen a ______ for our summer vacation.", "2. Many tourists come to Australia to see ______ and koalas."],
			"select_words": ["landscape", "remote", "kangaroos", "chain", "aboard", "vehicle", "soccer", "destination", "cash", "route"],
			"correct": ["kangaroos", "chain", "kangaroos", "chain", "aboard", "vehicle", "soccer", "destination", "cash", "route"]
		}]
	},{
		id:'122',
		"part": "语言知识运用",
		"name": "短文填空题",
		"type": "选词填空",
		"directions": {
			"en": "Fill in the blanks with the correct form of the words below.",
			"zh": "用下列单词的正确形式填空。"
		},
		article:'I still remember the ___1___ Day even though I have ___2___ from the university for many years. I went to the school alone carrying a big suitcase filled with books.',
		"detail": [{
			"steam": null,
			"select_words": ["landscape", "remote", "kangaroos", "chain", "aboard", "vehicle", "soccer", "destination", "cash", "route","aaaa"],
			"correct": ["landscape", "remote", "kangaroos", "chain", "aboard", "vehicle", "soccer", "destination", "cash", "route"]
		}]
	}, {
		"part": "语言知识运用",
		"name": "根据单词首字母和括号中的释义，将正确的单词填入句子中。",
		"type": "提示填空",
		"directions": {
			"en": "Fill in the blanks with the correct words according to their first letter and definition.",
			"zh": "根据单词首字母和括号中的释义，将正确的单词填入句子中。"
		},
		"detail": [{
			"steam": ["1. He was c______（好奇的）about what she wrote.", "2. He was the a______（作者）of two books on China."],
			"correct": ["landscape", "remote"]
		}]
	}, {
		"part": "语言知识运用",
		"name": "单词网格",
		"type": "网格填空",
		"directions": {
			"en": null,
			"zh": null
		},
		"detail": [{
			"steam": ["2.5:8", "2.6:9", "3.5:D", "3.6:@"],
			"correct": ["2.1 A", "2.2 B"]
		}]
	}, {
		id:"123",
		"part": "语言知识运用",
		"name": "完形填空题",
		"type": "完形填空",
		"directions": {
			"en": null,
			"zh": null
		},
		"article": "Since the beginning of the twentieth century the number of wild Tigers has been on an alarming decrease. ____1___, it appears the tide has finally turned. The ___2___ of dedicated conservation programmes has ___3___ the first growth in wild population numbers for over a century and, while still vulnerable, the big cat’s future is looking a little more assured.",
		"detail": [{
			"steam": null,
			"options": ["A. Thoughssss", "B.Therefore", "C.However", "D. Instead"],
			"correct": ["A"]
		}, {
			"steam": null,
			"options": ["A. Though", "B.Therefore", "C.However", "D. Instead"],
			"correct": ["B"]
		}]
	}, {
		"part": "阅读",
		"name": "单选题",
		"type": "阅读单选",
		"directions": {
			"en": "Read the passage and choose the correct answer.",
			"zh": "阅读下列短文，从每题所给的A、B、C、D四个选项中选出最佳选项。"
		},
		"article": "High school might be the last stop on the educational journey for many people, or it may serve to prepare the student for a subsequent college education. Motivated students sometimes achieve a great deal of learning during high school life while others do little but idle（虚度） the years away.",
		"detail": [{
			"steam": "1. Which of the following can replace the underlined word “aid” in Paragraph 1?",
			"options": ["A. staff", "B. help", "C. information", "D. cost"],
			"correct": ["A"]
		},{
			"steam": "2. Which of the following can replace the underlined word “aid” in Paragraph 1?",
			"options": ["A. Which of the following can", "B. Which of the following can", "C. information", "D. cost"],
			"correct": ["A"]
		}]
	}, {
		"id":'1',
		"part": "阅读",
		"name": "任务型阅读",
		"type": "选句填空",
		"directions": {
			"en": "Read the passage. According to the context, choose the sentence that can fill in the blank. There are two options you may not use.",
			"zh": "根据短文内容，从短文后的选项中选出能填入空白处的最佳选项。选项中有两项为多余选项。"
		},
		"article": "___1___ Moving up to senior high school is a chance, not a problem. Things are different, and all you need to do is to be open-minded and learn the new rules. ___2___ If you don’t know what to do or have problems in learning or relationship, you should ask for help. Teachers are certainly the best people to turn to because they have experience in dealing with students’ problems, including helping them get used to the new environment. Also, if you cannot attend the school for some days, ask your teachers about any missed work. It is your responsibility to catch up, not theirs. \r\n___5___ \r\n",
		"detail": [{
			"stems": null,
			"options": [
				"A. It is risky to start on your work a few days before your deadline. ",
				"B. If it is due to valid reasons",
				"C. Do not put your future to waste. ",
				"D. So remember that you all are in the same boat. ",
				"E. Your friends will help you solve them. ",
				"F. The teachers will help. ",
				"G. Some students find it hard to get up early in the morning."
			],
			"corrects": ["A", "B"]
		}]
	},{
		"part": "阅读",
		"name": "判断题",
		"type": "判断",
		"directions": {
			"en": "Decide if the following statements are true or false.",
			"zh": "判断下列表述的正误。"
		},
		"detail": [{
			"steam": ["It's always a problem for a family with children to find a suitable restaurant on holiday.", "Children can cook by themselves and their parents can clean up for them."],
			"correct": [0, 1]
		}]
	}, {
		"part": "阅读",
		"name": "简答题每个问题下方留横线",
		"type": "简答",
		"directions": {
			"en": "Answer the questions.",
			"zh": "回答下列问题。"
		},
		"detail": [{
			"steam": "1. Why more and more visitors are able to visit polar regions?",
			"correct": "more and more"
		}, {
			"steam": "2. What were the Antarctic cruises like in 1960s?",
			"correct": "more and more"
		}]
	}, {
		"part": "写作",
		"name": "翻译",
		"type": "简答",
		"directions": {
			"en": "Translate the sentences into English.",
			"zh": "将下列句子翻译为英文。"
		},
		"detail": [{
			"steam": ["1. 游客们习惯于在外国使用信用卡。（be used to）"],
			"correct": ""
		}, {
			"steam": ["2. 我决心要赚足够的钱去澳大利亚旅行。（be determined to do）"],
			"correct": ""
		}]
	}, {
		"part": "写作",
		"name": "作文",
		"type": "作文",
		"directions": {
			"en": "",
			"zh": ""
		},
		"detail": [{
			"steam": [""],
			"correct": [""]
		}]
	}, {
		"name": "口语",
		"type": "朗读课文",
		"directions": {
			"en": "",
			"zh": ""
		},
		"detail": [{
			"steam": [""],
			"correct": [""]
		}]
	}]
})

export default [
	{
		url: '/topic/list',
		type: 'get',
		response: config => {
			return {
				code: 20000,
				res: data
			}
		}
	}
]

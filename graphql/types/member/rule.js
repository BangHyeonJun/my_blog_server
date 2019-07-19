// 모든 규칙
const rule = [
    // 회원 관련
    { name: "회원 추가", code: 100 }, // 0
    { name: "회원 관리", code: 101 }, // 1
    { name: "회원 삭제", code: 102 }, // 2

    // 게시글 관련
    { name: "회원 게시글 추가", code: 200 }, // 3
    { name: "회원 게시글 읽기", code: 201 }, // 4
    { name: "회원 게시글 수정", code: 202 }, // 5
    { name: "회원 게시글 삭제", code: 203 }, // 6
    { name: "모든 게시글 삭제", code: 204 } // 7
];

// 어드민 권한
const admin = rule;

// 매니저 권한
const manager = [rule[0], rule[1], rule[3], rule[4], rule[5], rule[6], rule[7]];

// 유저 권한
const member = [rule[3], rule[4], rule[5], rule[6]];

// 비회원 권한
const non_member = [rule[4]];

const RULE = {
    admin: admin,
    manager: manager,
    member: member,
    non_member: non_member
};

export default RULE;

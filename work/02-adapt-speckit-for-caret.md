# `spec-kit`을 Caret에 맞게 적응시키는 계획

## 1. 목표
`spec-kit`의 워크플로우를 Caret 에이전트가 이해하고 실행할 수 있도록 프로젝트 구조를 수정한다.

## 2. 분석
- `spec-kit`은 `.specify/scripts/`에 핵심 로직(셸 스크립트)을 두고, 각 AI 에이전트별 폴더(예: `.roo/`) 내의 마크다운 파일들을 통해 명령어 프롬프트를 전달한다.
- Caret은 `.caretrules`와 `workflows`를 사용하지만, `spec-kit`의 구조에 맞추기 위해 에이전트별 프롬프트 템플릿 방식을 활용하는 것이 효율적이다.

## 3. 실행 계획

### 단계 1: Caret 전용 명령어 폴더 생성
`roo` 에이전트의 설정을 기반으로 Caret을 위한 설정 폴더를 생성한다.

```bash
# .roo 폴더를 .cline으로 복사
cp -r .roo .cline
```

### 단계 2: Caret 맞춤형 프롬프트 템플릿으로 수정
`.cline/commands/` 내의 각 마크다운 파일을 Caret이 사용하는 `tool` 형식에 맞게 수정한다. 첫 번째 예시로 `specify.md` 파일을 수정하여 Caret이 셸 스크립트를 `<execute_command>` 도구로 실행하도록 명확하게 지시한다.

**수정 전 (`.roo/commands/specify.md`):**
```markdown
1. Run the script `.specify/scripts/bash/create-new-feature.sh --json "$ARGUMENTS"` from repo root...
```

**수정 후 (`.cline/commands/specify.md`):**
```markdown
1. Execute the script using the `execute_command` tool like this:
   <execute_command>
   <command>.specify/scripts/bash/create-new-feature.sh --json "$ARGUMENTS"</command>
   <requires_approval>false</requires_approval>
   </execute_command>
   ...
```
(이 수정은 계획 승인 후 별도의 파일 수정 단계에서 진행)

### 단계 3: 기존 에이전트 설정 삭제
작업의 혼선을 방지하기 위해, 더 이상 사용하지 않을 `.roo` 폴더를 삭제한다.

```bash
rm -rf .roo
```

## 4. 예상 결과
위 단계를 완료하면, `spec-kit`의 `/specify`, `/plan` 등의 명령어들을 Caret이 올바르게 해석하고 실행할 수 있게 된다.

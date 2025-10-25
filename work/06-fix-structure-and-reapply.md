# `spec-kit` 구조 오류 수정 및 `ai-hompy` 재적용 최종 계획

## 1. 목표
`spec-kit` 템플릿의 디렉토리 구조 오류를 수정하고, `specify-cli`의 경로 생성 문제를 해결하여, `ai-hompy` 프로젝트에 `.caretrules/workflows/` 구조를 올바르게 설정한다.

## 2. 문제 원인
1.  **템플릿 구조 오류**: 생성된 `.zip` 파일의 내부 구조가 `__rules__/commands/`로 되어 있어, Caret/Cline의 표준(`workflows` 또는 루트)과 맞지 않음.
2.  **CLI 경로 생성 오류**: `specify init .` 실행 시, 스크립트가 압축 해제된 파일들을 `.caretrules` 내부가 아닌 프로젝트 최상위 경로에 생성함.

## 3. 작업 단계

### 단계 1: `ai-hompy` 프로젝트 환경 정리
- `specify init`이 잘못 생성한 `commands`, `.specify`, `.roo` 디렉토리를 삭제한다.
- **실행 명령어**: `rm -rf commands .specify .roo`

### 단계 2: 올바른 구조의 템플릿 패키지 재생성
- `__rules__/workflows/` 구조를 가진 새로운 `spec-kit-template-cline.zip` 파일을 생성하여 `spec-kit/release/`에 덮어쓴다.

### 단계 3: 수정된 패키지 커밋 및 강제 푸시
- `spec-kit` 디렉토리로 이동한다.
- 변경된 `release/spec-kit-template-cline.zip` 파일을 Git에 추가한다.
- "fix(template): Correct structure to use workflows directory" 메시지로 커밋한다.
- 원격 저장소 `main` 브랜치에 강제 푸시하여 서버의 파일을 덮어쓴다.

### 단계 4: `specify-cli` 재설치 및 프로젝트 초기화
- `uv tool uninstall` 후 `uv tool install`을 실행하여 `specify-cli`를 최신 버전으로 업데이트한다.
- 마스터께 `specify init . --ai cline` 명령어를 실행하고, 프롬프트에서 `Caret (.caretrules)`를 선택하도록 요청한다.

### 단계 5: 경로 수동 수정 및 검증
- `specify init` 실행 후, 파일들이 최상위 `workflows` 디렉토리에 생성될 가능성이 높다.
- `.caretrules/workflows` 디렉토리를 생성한다.
- `workflows/`에 있는 `plan.md`와 `specify.md` 파일을 `.caretrules/workflows/`로 이동시킨다.
- 불필요한 최상위 `workflows` 디렉토리를 삭제한다.
- `ls -aR` 명령어로 최종 구조를 검증한다.

### 단계 6: `ai-hompy/README.md` 생성
- `ai-hompy` 프로젝트 루트에 `README.md` 파일을 생성하여, 이 프로젝트의 목적과 `spec-kit`을 적용하여 `.caretrules`를 설정한 과정을 문서화한다.

## 4. 실행 도구
- `execute_command`
- `ask_followup_question`
- `write_to_file`

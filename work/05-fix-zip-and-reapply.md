# `spec-kit` 템플릿 패키지 생성 및 적용 최종 해결 계획

## 1. 목표
누락된 `spec-kit-template-cline.zip` 파일을 생성하여 원격 저장소에 푸시하고, `ai-hompy` 프로젝트에 성공적으로 `.caretrules`를 설정한다.

## 2. 문제 원인
- `spec-kit` 저장소에 `release/spec-kit-template-cline.zip` 파일이 생성되거나 커밋되지 않았음.
- 이로 인해 `specify-cli`가 해당 URL에서 파일을 다운로드하지 못하고 `404 Not Found` 오류 발생.

## 3. 작업 단계

### 단계 1: 템플릿 패키지(.zip 파일) 생성
- `spec-kit/release` 디렉토리를 생성한다.
- 임시 디렉토리에 `__rules__/commands` 구조를 만든다.
- `plan.md`와 `specify.md` 템플릿을 임시 디렉토리로 복사한다.
- 임시 디렉토리의 내용을 `spec-kit-template-cline.zip` 파일로 압축한다.
- 생성된 `.zip` 파일을 `spec-kit/release/` 디렉토리로 이동시킨다.
- 임시 디렉토리를 삭제한다.

### 단계 2: 생성된 패키지 커밋 및 푸시
- `spec-kit` 디렉토리로 이동한다.
- `release/spec-kit-template-cline.zip` 파일을 Git에 추가한다.
- "build: Add pre-packaged cline template zip" 메시지로 커밋한다.
- 원격 저장소 `main` 브랜치에 푸시한다.

### 단계 3: `specify-cli` 재설치 및 프로젝트 초기화
- `uv tool install` 명령어를 사용하여 `specify-cli`를 최신 버전으로 다시 설치한다.
- 마스터께 `specify init . --ai cline` 명령어를 실행하고, 프롬프트에서 `Caret (.caretrules)`를 선택하도록 요청한다.

### 단계 4: 결과 검증 및 문서화
- `ls -a` 명령어로 `.caretrules` 디렉토리 생성을 확인한다.
- `ai-hompy` 프로젝트의 `README.md` 파일을 생성하여 전체 과정을 문서화한다.

## 4. 실행 도구
- `execute_command`
- `ask_followup_question`
- `write_to_file`
